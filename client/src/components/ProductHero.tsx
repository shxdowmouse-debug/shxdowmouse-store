import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

interface ProductHeroProps {
  product: Product;
  onBuyClick?: () => void;
}

export function ProductHero({ product, onBuyClick }: ProductHeroProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 md:pt-24 pb-12 overflow-hidden">

        {/* Soft glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

        {/* Main grid */}
        <div className="container max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto grid items-center relative z-10">

          {/* LEFT SIDE — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-center"
          >
            {/* Badge (coming soon) with red flashing dot */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mx-auto">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse"></span>
                <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping"></span>
              </span>
              Coming Soon
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter break-words">
              SHXDOWMOUSE <br />
              COMING SOON
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Ultra-lightweight precision engineered for competitive players who demand excellence. Stay tuned for the release.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl text-lg font-semibold bg-white text-black hover:bg-white/90 hover:-translate-y-1 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                onClick={onBuyClick}
              >
                Stay Updated
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

              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl text-lg font-medium border-white/10 hover:bg-white/5 hover:text-white transition-all flex items-center gap-2"
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize2 className="w-5 h-5" />
                View Product
              </Button>
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 md:mt-0"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-2xl opacity-50" />
              <img
                src="/images/mouse.png"
                alt="SHXDOWMOUSE Product"
                className="relative w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main Content Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Product Image - Large */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1 flex items-center justify-center"
              >
                <img
                  src="/images/mouse.png"
                  alt="SHXDOWMOUSE Product - Fullscreen"
                  className="w-full max-w-md object-contain"
                />
              </motion.div>

              {/* Product Info - Large */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 space-y-6 text-center lg:text-left"
              >
                <div>
                  <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-2">
                    Coming Soon
                  </p>
                  <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                    SHXDOWMOUSE <br />
                    <span className="text-3xl md:text-4xl text-white/60">Precision Gaming</span>
                  </h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Engineered with extreme precision for competitive players who demand the absolute best. Every detail has been meticulously crafted to deliver unmatched performance, speed, and control.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Key Features:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">▸</span>
                      <span>Ultra-lightweight design for faster response times</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">▸</span>
                      <span>Precision-engineered for esports professionals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">▸</span>
                      <span>Advanced ergonomic design for extended gaming sessions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">▸</span>
                      <span>Premium build quality with cutting-edge technology</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl text-lg font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                    onClick={() => {
                      setIsFullscreen(false);
                      onBuyClick?.();
                    }}
                  >
                    Stay Updated
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
