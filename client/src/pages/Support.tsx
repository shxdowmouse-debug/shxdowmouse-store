import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSupportTicketSchema } from "@shared/schema";
import { useCreateSupportTicket } from "@/hooks/use-contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, HelpCircle, Loader2 } from "lucide-react";

export default function Support() {
  const mutation = useCreateSupportTicket();
  const form = useForm({
    resolver: zodResolver(insertSupportTicketSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container px-4 max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            How can we help?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Our support team is here to assist with any questions or issues you may have.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card border border-white/5 rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Name</label>
                  <Input 
                    {...form.register("name")}
                    placeholder="Your name"
                    className="bg-secondary/50 border-white/10 h-12 rounded-xl focus:ring-primary/50"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Email</label>
                  <Input 
                    {...form.register("email")}
                    placeholder="your@email.com"
                    className="bg-secondary/50 border-white/10 h-12 rounded-xl focus:ring-primary/50"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Message</label>
                <Textarea 
                  {...form.register("message")}
                  placeholder="How can we help you?"
                  className="bg-secondary/50 border-white/10 min-h-[150px] rounded-xl focus:ring-primary/50 resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                disabled={mutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 rounded-xl text-base"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>

          {/* Quick Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {[
              {
                icon: <Mail className="w-6 h-6 text-primary" />,
                title: "Email Support",
                desc: "We usually respond within 24 hours.",
                action: "support@shxdow.com"
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
                title: "Live Chat",
                desc: "Available Mon-Fri, 9am - 5pm EST.",
                action: "Currently Offline"
              },
              {
                icon: <HelpCircle className="w-6 h-6 text-purple-400" />,
                title: "FAQ",
                desc: "Find quick answers to common questions.",
                action: "View FAQ"
              }
            ].map((item, i) => (
              <div key={i} className="bg-card/50 border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors">
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <span className="text-sm font-medium text-white/80">{item.action}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
