# Smart Contracts — Solidario México

## Contrato: ImpactFundKintsu

Fondo de donaciones transparente on-chain con staking en Kintsu (Monad).

### Funciones principales

| Función | Descripción |
|---|---|
| `donate()` | Donar MON (payable) |
| `unlockFundsToAdmin()` | Liberar fondos cuando se cumple la meta (solo owner) |
| `claimRefund()` | Reembolso si no se cumple la meta |

### Deploy en Monad Testnet

```bash
# 1. Instalar Foundry
curl -L https://foundry.paradigm.xyz | bash && foundryup

# 2. Instalar dependencias
cd contracts
forge install foundry-rs/forge-std
forge install OpenZeppelin/openzeppelin-contracts

# 3. Deploy
forge script script/DeployImpactFund.s.sol \
  --rpc-url https://testnet-rpc.monad.xyz \
  --private-key TU_PRIVATE_KEY \
  --broadcast

# 4. Verificar
# Copiar la dirección del contrato y actualizar VITE_CONTRACT_ADDRESS en .env
```

### Parámetros del constructor

- `_kintsuVault`: `0x277C010696a2468350B4C63E4402662c3f848135`
- `_kAsset`: Dirección del token sMON en Monad Testnet
- `_targetGoal`: Meta en wei (ej: `10 ether` = 10 MON)
- `_durationInDays`: Días que dura la campaña
