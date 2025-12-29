import { motion } from "framer-motion";
import productImg from "@assets/image_1766953081773.png";
import { Check, Shield, Truck } from "lucide-react";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Buy() {
  const mutation = useCreateSubscriber();
  const form = useForm({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: { email: string }) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Product Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 p-12 flex items-center justify-center overflow-hidden">
               {/* Decorative elements */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
               
               <img 
                 src={productImg} 
                 alt="Shxdowmouse Product" 
                 className="w-full h-auto drop-shadow-2xl relative z-10"
               />
            </div>
          </motion.div>

          {/* Buying Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Unreleased
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Shxdow One Pro
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">$149.00</span>
                <span className="text-lg text-muted-foreground line-through">$199.00</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                The wait is almost over. Secure your spot in line for the most anticipated gaming mouse of the year. Limited first batch production.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "4KHz Wireless Polling",
                "49g Ultralight Shell",
                "Optical Switches Gen-3",
                "95h Battery Life"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Notification Form instead of Buy Button */}
            <div className="p-6 rounded-2xl bg-card border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Get Notified</h3>
                <span className="text-xs text-muted-foreground">Don't miss the drop</span>
              </div>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    {...form.register("email")}
                    placeholder="Enter email address" 
                    className="bg-secondary border-white/10"
                  />
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="bg-white text-black hover:bg-white/90 font-semibold"
                  >
                    {mutation.isPending ? "Joining..." : "Join Waitlist"}
                  </Button>
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  By joining, you agree to receive updates about product availability.
                </p>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                  <strong className="block text-white mb-0.5">2 Year Warranty</strong>
                  Full coverage included
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                  <strong className="block text-white mb-0.5">Free Shipping</strong>
                  Global delivery
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
