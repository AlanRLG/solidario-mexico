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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DonationEvent } from "@/data/events";
import { Heart, CreditCard, Building2, Smartphone } from "lucide-react";
import { toast } from "sonner";

const predefinedAmounts = [100, 200, 500, 1000, 2500];

const paymentMethods = [
  { id: "tarjeta", label: "Tarjeta de crédito/débito", icon: CreditCard },
  { id: "transferencia", label: "Transferencia bancaria", icon: Building2 },
  { id: "oxxo", label: "Pago en OXXO", icon: Smartphone },
];

interface Props {
  event: DonationEvent | null;
  open: boolean;
  onClose: () => void;
}

const DonationModal = ({ event, open, onClose }: Props) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");

  if (!event) return null;

  const finalAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0);

  const handleConfirm = () => {
    if (finalAmount <= 0) {
      toast.error("Por favor selecciona un monto válido");
      return;
    }
    toast.success(
      `¡Gracias por tu donación de $${finalAmount.toLocaleString("es-MX")} MXN para "${event.name}"!`,
      { description: "Tu generosidad cambia vidas. 🧡" }
    );
    onClose();
    setSelectedAmount(500);
    setCustomAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent fill-accent" />
            {event.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Amount Selection */}
          <div>
            <Label className="text-sm font-semibold text-foreground mb-3 block">
              Selecciona un monto (MXN)
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
                  ${amount.toLocaleString("es-MX")}
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

          {/* Payment Method */}
          <div>
            <Label className="text-sm font-semibold text-foreground mb-3 block">
              Método de pago
            </Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? "border-primary bg-trust-light"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={method.id} />
                  <method.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{method.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base rounded-xl"
            onClick={handleConfirm}
          >
            Confirmar Transacción — ${finalAmount.toLocaleString("es-MX")} MXN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
