import { motion } from "framer-motion";
import { Link } from "wouter";
import productImg from "@assets/image_1767009635810.png";
import { ArrowRight, ChevronRight, Zap, Target, Wifi } from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Coming Soon 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white max-w-4xl"
            >
              Introducing <br />
              <span className="text-gradient-primary">shxdowmouse</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Precision engineered for the elite. The ultimate wireless gaming mouse designed for those who operate in the dark.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/buy">
                <button className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 flex items-center gap-2">
                  Coming Soon 2026 <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/specs">
                <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
                  View Specifications
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="mt-16 relative mx-auto max-w-4xl perspective-1000"
          >
             {/* Glow behind product */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-t from-primary/20 to-transparent blur-3xl opacity-40 rounded-full pointer-events-none" />
             
             <img 
              src={productImg} 
              alt="Shxdowmouse Pro" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Ultralight Design",
                desc: "Engineered to be an extension of your hand, weighing in at just 49g."
              },
              {
                icon: <Target className="w-6 h-6 text-red-400" />,
                title: "Pro-Grade Sensor",
                desc: "30K DPI optical sensor with flawless 1:1 tracking accuracy."
              },
              {
                icon: <Wifi className="w-6 h-6 text-blue-400" />,
                title: "Zero Latency",
                desc: "Hyperfast wireless technology that's faster than wired connections."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to upgrade?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            Join thousands of gamers waiting for the next evolution in competitive gaming.
          </p>
          <Link href="/buy">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-bold transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              Reserve Yours <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
