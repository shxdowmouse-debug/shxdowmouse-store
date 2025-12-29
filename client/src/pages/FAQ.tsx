import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FAQ() {
  const faqs = [
    {
      question: "When is shxdowmouse being released?",
      answer: "shxdowmouse is scheduled for release in Late 2026."
    },
    {
      question: "What makes shxdowmouse different?",
      answer: "shxdowmouse is precision engineered for the elite, featuring a design focused on ultimate control and lightweight performance for those who operate in the dark."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we plan to offer worldwide shipping upon release."
    },
    {
      question: "What is the warranty period?",
      answer: "We offer a 2-year warranty on all manufacturing defects."
    },
    {
      question: "Can I cancel my pre-order?",
      answer: "Yes, pre-orders can be cancelled at any time before shipping for a full refund."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">Everything you need to know about shxdowmouse</p>
        </div>

        <div className="grid gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-white/10">
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
