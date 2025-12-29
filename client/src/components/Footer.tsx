import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import logo from "@assets/image-removebg-preview_(2)_1766952979287.png";

export function Footer() {
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
    <footer className="border-t border-white/5 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="shxdowmouse" className="h-8 w-auto opacity-80" />
              <span className="font-display font-bold text-lg tracking-wide">shxdowmouse</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Crafting the ultimate interface between thought and action. 
              Precision engineered for the elite.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/specs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Specifications
                </Link>
              </li>
              <li>
                <Link href="/buy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pre-order
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join the waitlist for exclusive drops and updates.
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="relative">
                <Input
                  {...form.register("email")}
                  placeholder="Enter your email"
                  className="bg-secondary/50 border-white/10 focus:border-primary/50 text-white placeholder:text-white/20 pr-12 h-11 rounded-xl"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={mutation.isPending}
                  className="absolute right-1 top-1 h-9 w-9 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {form.formState.errors.email && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2025 shxdowmouse. All rights reserved.
          </p>
          <div className="flex space-x-6 text-muted-foreground">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
