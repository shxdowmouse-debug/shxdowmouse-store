import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductHero } from "@/components/ProductHero";
import { Features } from "@/components/Features";
import { OrderModal } from "@/components/OrderModal";
import { useProduct } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import productImage from "@assets/IMG_20251222_151603_1766416627210.png";

export default function Home() {
  // Assume product ID 1 is the main product as per requirements
  const { data: product, isLoading, error } = useProduct(1);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Navbar onBuyClick={() => setIsOrderOpen(true)} />
      
      <main>
        <ProductHero 
          product={product} 
          onBuyClick={() => setIsOrderOpen(true)} 
        />
        
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
                <div className="bg-card/50 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors flex flex-col md:flex-row">
                  {/* Text Content - Left */}
                  <div className="p-8 md:p-12 flex flex-col justify-center flex-1 order-2 md:order-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">shxdowmouse one</h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      Ultra-lightweight fingertip mouse designed with precision.
                    </p>
                    
                    <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                      <li className="flex items-center gap-2">
                        <span className="text-white/40">•</span> Ultra lightweight
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white/40">•</span> Wireless
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-white/40">•</span> Precision tracking sensor
                      </li>
                    </ul>

                    <Button
                      onClick={() => setIsOrderOpen(true)}
                      className="w-full md:w-auto h-12 px-8 rounded-2xl text-base font-semibold bg-white text-black hover:bg-white/90 transition-all"
                    >
                      Coming soon...
                    </Button>
                  </div>

                  {/* Image - Right */}
                  <div className="bg-white/5 h-80 md:h-auto md:w-1/2 flex items-center justify-center order-1 md:order-2">
                    <img
                      src={productImage}
                      alt="shxdowmouse one"
                      className="h-full w-full object-cover p-0"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-6">shxdowmouse</h2>
            <div className="flex justify-center gap-8 mb-8 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors" data-testid="link-terms">Terms</a>
              <a href="/support" className="hover:text-white transition-colors" data-testid="link-support">Support</a>
              <a href="#" className="hover:text-white transition-colors">Home</a>
            </div>
            <p className="text-xs text-white/20">
              © 2026 shxdowmouse inc. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      <OrderModal 
        isOpen={isOrderOpen} 
        onClose={() => setIsOrderOpen(false)} 
        product={product} 
      />
    </div>
  );
}
