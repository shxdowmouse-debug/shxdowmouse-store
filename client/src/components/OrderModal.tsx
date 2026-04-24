import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";
import type { Product } from "@shared/schema";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setEmail("");
          setSubmitted(false);
          onClose();
        }, 2000);
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Notify error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEmail("");
      setSubmitted(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-white/10 text-white rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display font-bold">
            Stay Updated
          </DialogTitle>
          <DialogDescription className="text-white/60 text-base">
            Get first access to shxdowmouse releases and exclusive updates.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 py-8">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">You're all set!</p>
              <p className="text-white/60 text-sm mt-2">
                We'll notify you when shxdowmouse becomes available.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleNotifySubmit} className="mt-6 space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/50" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl text-base font-bold bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Subscribing..." : "Notify Me"}
            </Button>

            <p className="text-xs text-white/40 text-center">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
