import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductHero } from "@/components/ProductHero";
import { Features } from "@/components/Features";
import { OrderModal } from "@/components/OrderModal";
import { ShootingStars } from "@/components/ShootingStars";
import { useProduct } from "@/hooks/use-products";
import { Loader2, Maximize2, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import productImage from "../../public/images/shxdowmouseone.png";

export default function Home() {
  const { data: product, isLoading, error } = useProduct(1);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isProductFullscreen, setIsProductFullscreen] = useState(false);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="font-display tracking-widest text-sm animate-pulse">LOADING SHADOW</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white gap-6">
        <h1 className="text-4xl font-display font-bold text-red-500">System Failure</h1>
        <p className="text-muted-foreground max-w-md text-center">
          Could not load product data. The shxdow has consumed the connection.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black relative">
      <ShootingStars />
      <Navbar onBuyClick={() => setIsOrderOpen(true)} />
      
      <main>
        <ProductHero product={product} onBuyClick={() => setIsOrderOpen(true)} />
        
        <Features />

        <section id="products" className="py-24 bg-background relative">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-bold mb-4">Our Products</h2>
              <p className="text-muted-foreground text-lg">
                Every shxdowmouse is crafted for peak performance
              </p>
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl"
              >
                <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors flex flex-col md:flex-row">
                  {/* Text Content - Left */}
                  <div className="p-8 md:p-12 flex flex-col justify-center flex-1 order-2 md:order-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">shxdowmouse one</h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      Ultra‑lightweight fingertip mouse crafted for precision, seamlessly powered by Attack Shark X8 SE internals.
                    </p>
                    
                    <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                      <li className="flex items-center gap-2">
                        <span className="text-white/40">•</span> 25g Ultra Lightweight design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white/40">•</span> Tri-Mode Connectivity
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white/40">•</span> 25,000 DPI Optical Sensor
                      </li>
                    </ul>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => setIsOrderOpen(true)}
                        className="h-12 px-6 rounded-2xl text-base font-semibold bg-white text-black hover:bg-white/90 transition-all"
                      >
                        Stay Updated
                      </Button>

                      <Button
                        ref={fullscreenButtonRef}
                        onClick={() => setIsProductFullscreen(true)}
                        size="icon"
                        variant="outline"
                        className="h-12 w-12 rounded-2xl border-white/10 hover:bg-white/5 transition-all"
                        title="View Product"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Image - Right */}
                  <div className="bg-black/40 relative h-96 md:h-auto md:w-1/2 flex items-center justify-center order-1 md:order-2 rounded-3xl overflow-hidden group">
                    {/* White glow effect - more visible on hover */}
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/15 rounded-3xl blur-2xl transition-all duration-300" />
                    <img
                      src={productImage}
                      alt="shxdowmouse one"
                      className="h-full w-full object-cover p-0 scale-100 group-hover:scale-110 transition-transform duration-300 relative z-10"
                      style={{
                        filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-6">shxdowmouse</h2>
            <div className="flex justify-center gap-8 mb-8 text-sm text-muted-foreground">
              <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white transition-colors">Home</a>
              <a href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">Terms</a>
              <a href="/cookies" className="hover:text-white transition-colors" data-testid="link-cookies">Cookies</a>
            </div>
            <p className="text-xs text-white/20">
              © 2026 shxdowmouse inc. All rights reserved.
            </p>
          </div>

          {/* Big background text */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none w-full flex items-center justify-center overflow-visible">
            <h1 className="font-display font-bold text-white/15 leading-tight whitespace-nowrap flex-shrink-0" style={{ fontSize: "clamp(150px, 20vw, 500px)", transform: "translateY(35%)" }}>
              shxdowmouse
            </h1>
          </div>
        </footer>
      </main>

      <OrderModal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} product={product} />

      {/* Product Fullscreen Modal */}
      {isProductFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setIsProductFullscreen(false)}
        >
          <motion.div
            layoutId="product-fullscreen"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-card/80 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col items-center"
          >
            {/* Close Button - Inside the box */}
            <button
              onClick={() => setIsProductFullscreen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Main Content Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full mt-8">
              {/* Product Image - Large with curved edges */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="w-full max-w-sm h-96 rounded-3xl overflow-hidden bg-white/5">
                  <img
                    src={productImage}
                    alt="shxdowmouse one - Fullscreen"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </motion.div>

              {/* Product Info - Large */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 space-y-6 text-center lg:text-left"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                    shxdowmouse one
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ultra‑lightweight fingertip mouse crafted for precision, seamlessly powered by Attack Shark X8 SE internals.
                  </p>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="text-white/40">•</span>
                    <span>25g Ultra Lightweight design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white/40">•</span>
                    <span>Tri-Mode Connectivity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-white/40">•</span>
                    <span>25,000 DPI Optical Sensor</span>
                  </li>
                </ul>

                <Button
                  onClick={() => {
                    setIsProductFullscreen(false);
                    setIsOrderOpen(true);
                  }}
                  className="h-12 px-8 rounded-2xl text-base font-semibold bg-white text-black hover:bg-white/90 transition-all"
                >
                  Stay Updated
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
