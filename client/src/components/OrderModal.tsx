import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any; // or Product type
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function BuyModal({ isOpen, onClose, product }: BuyModalProps) {
  if (!product) return null;

  const handleBuy = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
      }),
    });

    const session = await res.json();

    if (session?.id) {
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("Failed to start checkout.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-xl border-white/10 text-white rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display font-bold">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-white/60 text-base">
            Ultra‑lightweight performance engineered for competitive play.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="w-full flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-64 h-auto object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            />
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 25g Ultra Lightweight</li>
            <li>• Tri‑Mode Connectivity</li>
            <li>• 25,000 DPI Optical Sensor</li>
          </ul>

          <Button
            className="w-full h-14 rounded-2xl text-lg font-bold bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={handleBuy}
          >
            Buy Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
