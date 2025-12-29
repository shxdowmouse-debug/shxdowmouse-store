import { useMutation } from "@tanstack/react-query";
import { api, type InsertSupportTicket } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateSupportTicket() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSupportTicket) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
           const error = api.contact.create.responses[400].parse(await res.json());
           throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We've received your support request and will get back to you shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
