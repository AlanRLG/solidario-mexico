// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Interfaz simplificada de lo que sería el Vault de Kintsu en Monad
interface IKintsuVault {
    function deposit() external payable returns (uint256 shares);
    function withdraw(uint256 shares, address receiver, address owner) external returns (uint256 assets);
    function previewRedeem(uint256 shares) external view returns (uint256 assets);
}

contract ImpactFundKintsu is Ownable {
    IKintsuVault public immutable kintsuVault;
    IERC20 public immutable kAsset; // El token que recibes (ej: sMON)

    uint256 public immutable targetGoal;
    uint256 public immutable deadline;
    uint256 public totalPrincipal; // Monto exacto donado en MON
    uint256 public totalShares;    // "Recibos" de Kintsu guardados
    bool public goalReached;
    bool public fundsWithdrawn;

    uint256 public constant PLATFORM_FEE_BPS = 5; // 0.050%

    // Dirección del vault (staking) y wallet destino de los fondos
    address public immutable stakingWallet = 0xe1d2439b75fb9746E7Bc6cB777Ae10AA7f7ef9c5;
    address public immutable fundsWallet   = 0x050CF8016233cA56cb909A1A32Eec767A4bc16b7;

    mapping(address => uint256) public donations;

    constructor(
        address _kintsuVault, 
        address _kAsset,
        uint256 _targetGoal, 
        uint256 _durationInDays
    ) Ownable(msg.sender) {
        kintsuVault = IKintsuVault(_kintsuVault);
        kAsset = IERC20(_kAsset);
        targetGoal = _targetGoal;
        deadline = block.timestamp + (_durationInDays * 1 days);
    }

    function donate() external payable {
        require(block.timestamp < deadline, "Campana finalizada");
        require(msg.value > 0, "Monto invalido");

        donations[msg.sender] += msg.value;
        totalPrincipal += msg.value;

        uint256 sharesReceived = kintsuVault.deposit{value: msg.value}();
        totalShares += sharesReceived;

        if (totalPrincipal >= targetGoal) {
            goalReached = true;
        }
    }

    function unlockFundsToAdmin() external onlyOwner {
        require(goalReached, "Meta no cumplida");
        require(!fundsWithdrawn, "Ya retirado");
        fundsWithdrawn = true;

        uint256 totalAssets = kintsuVault.withdraw(totalShares, address(this), address(this));

        uint256 yieldGenerated = 0;
        if (totalAssets > totalPrincipal) {
            yieldGenerated = totalAssets - totalPrincipal;
        }

        uint256 fee = (yieldGenerated * PLATFORM_FEE_BPS) / 10000;
        uint256 amountToFund = totalAssets - fee;

        // Fee queda en el contrato (para la plataforma), resto va al fondo
        payable(fundsWallet).transfer(amountToFund);
    }

    function claimRefund() external {
        require(block.timestamp >= deadline, "Aun activo");
        require(!goalReached, "Meta cumplida");

        uint256 donatedAmount = donations[msg.sender];
        require(donatedAmount > 0, "Sin donacion");
        
        donations[msg.sender] = 0;

        uint256 sharesToRedeem = (donatedAmount * totalShares) / totalPrincipal;
        kintsuVault.withdraw(sharesToRedeem, msg.sender, address(this));
    }

    receive() external payable {}
}
