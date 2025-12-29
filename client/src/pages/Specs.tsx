import { motion } from "framer-motion";
import { Link } from "wouter";
import productImg from "@assets/image_1767009635810.png";
import { ChevronRight } from "lucide-react";

export default function Specs() {
  const specs = [
    { category: "Sensor", items: [
      { label: "Type", value: "High Precision Optical" },
      { label: "Performance", value: "Pro Grade" },
      { label: "Tracking", value: "Ultra Fast" },
      { label: "Latency", value: "Zero Lag" }
    ]},
    { category: "Physical", items: [
      { label: "Weight", value: "Ultra Lightweight" },
      { label: "Size", value: "Standard Fit" },
      { label: "Shape", value: "Ergonomic" },
      { label: "Build", value: "Premium" }
    ]},
    { category: "Battery", items: [
      { label: "Life", value: "Long Lasting" },
      { label: "Charging", value: "USB-C Fast Charge" },
      { label: "Type", value: "Lithium Ion" }
    ]},
    { category: "Connectivity", items: [
      { label: "Wireless", value: "HyperSpeed" },
      { label: "Wired", value: "SpeedFlex" },
      { label: "Polling Rate", value: "Pro Grade" }
    ]}
  ];

  return (
    <div className="pt-24 pb-12">
      <div className="container px-4 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Technical Specifications
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Every component selected for peak performance. No compromises.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Side - Sticky */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="relative rounded-3xl bg-card border border-white/5 p-8 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={productImg} 
                alt="Specs View" 
                className="w-full h-auto drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Specs List */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {specs.map((category, idx) => (
              <div key={idx} className="bg-card/50 rounded-2xl border border-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-sm text-muted-foreground mb-1">{item.label}</span>
                      <span className="text-base font-medium text-white font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-8">
              <Link href="/buy">
                <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
                  Proceed to Pre-order
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
