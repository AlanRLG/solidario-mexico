import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DonationEvent } from "@/data/events";
import { Heart, Wallet, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, IMPACT_FUND_ABI } from "@/lib/wagmi";

const predefinedAmounts = [0.1, 0.5, 1, 5, 10];

interface Props {
  event: DonationEvent | null;
  open: boolean;
  onClose: () => void;
}

const DonationModal = ({ event, open, onClose }: Props) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1);
  const [customAmount, setCustomAmount] = useState("");

  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  if (!event) return null;

  const finalAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0);

  const handleDonate = () => {
    if (finalAmount <= 0) {
      toast.error("Por favor selecciona un monto válido");
      return;
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: IMPACT_FUND_ABI,
      functionName: "donate",
      value: parseEther(finalAmount.toString()),
    });
  };

  const handleClose = () => {
    onClose();
    setSelectedAmount(1);
    setCustomAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent fill-accent" />
            {event.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">

          {/* Blockchain badge */}
          <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/30 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">
              Donación registrada en Monad Blockchain · 100% transparente
            </span>
          </div>

          {/* Amount Selection */}
          <div>
            <Label className="text-sm font-semibold text-foreground mb-3 block">
              Selecciona un monto (MON)
            </Label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`py-3 rounded-lg text-sm font-semibold transition-all border ${
                    selectedAmount === amount
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-foreground border-border hover:border-primary"
                  }`}
                >
                  {amount} MON
                </button>
              ))}
              <div className="relative">
                <Input
                  placeholder="Otro"
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="h-full text-center text-sm"
                />
              </div>
            </div>
          </div>

          {/* Success state */}
          {isSuccess && txHash && (
            <div className="bg-green-950/50 border border-green-700 rounded-lg p-4 text-center space-y-2">
              <p className="text-green-400 font-semibold">✅ ¡Donación enviada!</p>
              <p className="text-gray-400 text-xs">Tu donación está registrada on-chain para siempre.</p>
              <a
                href={`https://monad-testnet.socialscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-300 text-xs hover:underline"
              >
                Ver transacción <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs text-center bg-red-950/30 border border-red-800/30 rounded-lg p-2">
              {error.message.slice(0, 100)}
            </p>
          )}

          {/* CTA */}
          {!isConnected ? (
            <Button
              className="w-full py-6 text-base rounded-xl gap-2"
              onClick={() => connect({ connector: connectors[0] })}
            >
              <Wallet className="h-4 w-4" />
              Conectar Wallet para Donar
            </Button>
          ) : isSuccess ? (
            <Button className="w-full py-6 text-base rounded-xl" onClick={handleClose}>
              Cerrar
            </Button>
          ) : (
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base rounded-xl"
              onClick={handleDonate}
              disabled={isPending || isConfirming || finalAmount <= 0}
            >
              {isPending
                ? "⏳ Confirmando en wallet..."
                : isConfirming
                ? "⛏️ Procesando en blockchain..."
                : `💚 Donar ${finalAmount} MON`}
            </Button>
          )}

          <p className="text-center text-gray-500 text-xs">
            🔗 Cada transacción es pública y verificable en Monad Explorer
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
