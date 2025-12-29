import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

import Copilot_20251218_154313 from "@assets/Copilot_20251218_154313.png";

interface ProductHeroProps {
  product: Product;
  onBuyClick: () => void;
}

export function ProductHero({ product, onBuyClick }: ProductHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-48 md:pt-24 pb-12 overflow-hidden">
      {/* Background Gradient Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Coming Soon
          </div>

          <h1 className="text-6xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter">
            SHXDOWMOUSE <br />
            IS HERE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {product.description} An ultra-lightweight wireless gaming mouse designed for e-sports professionals who demand perfection.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              onClick={onBuyClick}
              className="h-14 px-8 rounded-2xl text-lg font-semibold bg-white text-black hover:bg-white/90 hover:-translate-y-1 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
            >
              Notify Me
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 rounded-2xl text-lg font-medium border-white/10 hover:bg-white/5 hover:text-white transition-all"
              onClick={() => {
                const element = document.getElementById('features');
                if (element) {
                  const navHeight = 120; // Account for navbar height
                  const elementPosition = element.offsetTop - navHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="relative group"
        >
           {/* Decorative circle */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl scale-75 group-hover:scale-90 transition-transform duration-700 opacity-50" />
          
          <div className="relative z-10 aspect-square flex items-center justify-center">
            {/* Using a placeholder if imageUrl is generic, but using the prop if real */}
            <img 
              src={Copilot_20251218_154313} 
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] hover:-translate-y-4 transition-transform duration-500 rounded-3xl"
            />
             {/* Descriptive comment for Unsplash: Minimalist black gaming mouse on dark background */}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
