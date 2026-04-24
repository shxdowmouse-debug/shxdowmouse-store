import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface ProductHeroProps {
  product: Product;
  onBuyClick?: () => void;
}

export function ProductHero({ product, onBuyClick }: ProductHeroProps) {

  return (
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
          {/* Badge (coming soon) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mx-auto">
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
          </div>
        </motion.div>

      </div>
    </section>
  );
}
