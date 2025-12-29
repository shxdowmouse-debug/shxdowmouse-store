import { Link } from "wouter";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onBuyClick: () => void;
}

export function Navbar({ onBuyClick }: NavbarProps) {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-center"
    >
      <div className="w-full max-w-7xl rounded-3xl px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-xl border border-white/5">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-white text-black p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <MousePointer2 size={20} fill="currentColor" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            shxdow<span className="text-white/50">mouse</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden md:block">
            Features
          </a>
          <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden md:block">
            Products
          </a>
          <Button 
            onClick={onBuyClick}
            className="rounded-2xl font-semibold px-6 bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-200"
          >
            Pre-order Now
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
