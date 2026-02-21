// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/ImpactFundKintsu.sol";

contract DeployImpactFund is Script {
    function run() external {
        vm.startBroadcast();

        ImpactFundKintsu fund = new ImpactFundKintsu(
            0x277C010696a2468350B4C63E4402662c3f848135, // Kintsu Vault en Monad Testnet
            0x277C010696a2468350B4C63E4402662c3f848135, // kAsset (actualizar con sMON address)
            10 ether,                                   // Meta: 10 MON
            30                                          // Duración: 30 días
        );

        console.log("ImpactFundKintsu deployado en:", address(fund));

        vm.stopBroadcast();
    }
}
