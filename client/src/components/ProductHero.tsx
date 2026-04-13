import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import Copilot_20251218_154313 from "@assets/Copilot_20251218_154313.png";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [loading, setLoading] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [email, setEmail] = useState("");

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

      const data = await res.json();

      if (res.ok) {
        alert("You're subscribed.");
        setNotifyOpen(false);
        setEmail("");
      } else {
        alert(data.message || "Failed to send confirmation email.");
      }
    } catch (err) {
      console.error("Notify error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 md:pt-24 pb-12 overflow-hidden">

      {/* Soft glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Main grid */}
      <div className="container max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT SIDE — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 text-center lg:text-left"
        >
          {/* Badge (now released) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mx-auto lg:mx-0">
            Available Now
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter text-center lg:text-left break-words">
            SHXDOWMOUSE <br />
            HAS ARRIVED
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {product.description} Engineered for competitive players who demand precision, speed, and a flawless wireless experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="h-14 px-8 rounded-2xl text-lg font-semibold bg-white text-black hover:bg-white/90 hover:-translate-y-1 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
              onClick={() => window.location.href = "#products"}
            >
              Buy Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 rounded-2xl text-lg font-medium border-white/10 hover:bg-white/5 hover:text-white transition-all"
              onClick={() => {
                const element = document.getElementById("features");
                if (element) {
                  const navHeight = 120;
                  const elementPosition = element.offsetTop - navHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* RIGHT SIDE — IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="relative group flex justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl scale-75 group-hover:scale-90 transition-transform duration-700 opacity-50" />

          <div className="relative z-10 aspect-square flex items-center justify-center">
            <img
              src={Copilot_20251218_154313}
              alt={product.name}
              className="w-80 sm:w-80 md:w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] hover:-translate-y-4 transition-transform duration-500 rounded-3xl mx-auto"
            />
          </div>
        </motion.div>

      </div>

      {/* EMAIL SIGNUP MODAL */}
      <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
        <DialogContent className="bg-black/90 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Stay Updated</DialogTitle>
            <DialogDescription className="text-white/70">
              Get updates about new shxdowmouse products, drops, and availability.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNotifySubmit} className="space-y-4 mt-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90"
            >
              {loading ? "Sending..." : "Subscribe"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
