import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import logo from "@assets/image-removebg-preview_(2)_1766952979287.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/specs", label: "Specs" },
  { href: "/buy", label: "Pre-order" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={logo} alt="shxdowmouse" className="h-10 w-auto relative z-10" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide">shxdowmouse</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 cursor-pointer relative py-1",
                    location === link.href
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 right-0 bottom-0 h-px bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-white transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-3 py-4 text-base font-medium rounded-lg transition-colors cursor-pointer",
                      location === link.href
                        ? "bg-white/5 text-white"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
