import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertOrderSchema, type Product } from "@shared/schema";
import { useCreateOrder } from "@/hooks/use-orders";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// Extend the schema for form validation
const formSchema = z.object({
  customerEmail: z.string().email("Please enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerEmail: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.customerEmail }),
      });

      if (!response.ok) {
        const error = await response.json();
        form.setError("customerEmail", {
          type: "manual",
          message: error.message || "Failed to send confirmation email",
        });
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        form.reset();
      }, 3000);
    } catch (error) {
      form.setError("customerEmail", {
        type: "manual",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-white/10 text-white rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display font-bold">Get Notified</DialogTitle>
          <DialogDescription className="text-white/60 text-base">
            Join the shadows. We'll notify you when <span className="text-white font-semibold">{product.name}</span> launches.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold font-display">You're On The List</h3>
            <p className="text-muted-foreground">We'll notify you when shxdowmouse launches.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        {...field} 
                        className="h-12 rounded-2xl bg-white/5 border-white/10 focus:border-white/30 transition-all placeholder:text-white/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                className="w-full h-14 rounded-2xl text-lg font-bold bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Notify Me
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
