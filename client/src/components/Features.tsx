import { motion } from "framer-motion";
import { Zap, Wifi, Feather, Crosshair, Battery, Mouse } from "lucide-react";

const features = [
  {
    icon: <Crosshair className="w-8 h-8" />,
    title: "Precision Tracking",
    description: "Pixel-perfect tracking with our custom Shadow sensor.",
  },
  {
    icon: <Feather className="w-8 h-8" />,
    title: "Ultralight Design",
    description: "Engineered for speed with a honeycomb internal structure.",
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    title: "Wireless Freedom",
    description: "Lag-free connection for wired-like performance.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Optical Switches",
    description: "Silent, responsive clicks with zero debounce delay.",
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Extended Battery",
    description: "Long-lasting battery life with fast USB-C charging.",
  },
  {
    icon: <Mouse className="w-8 h-8" />,
    title: "PTFE Feet",
    description: "Buttery smooth glide on any surface straight out of the box.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Tech Specs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to dominate the competition, packed into a featherlight chassis.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
