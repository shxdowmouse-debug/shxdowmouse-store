import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft size={18} />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-display font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: 21st December 2025</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the shxdowmouse website and purchasing our products, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Product Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide accurate product descriptions, specifications, and pricing information. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. Product images are for illustration purposes and may differ slightly from the actual product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Pricing and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are listed in USD and are subject to change without notice. We reserve the right to limit or refuse any order. Payment must be received before order shipment. We accept all major credit cards and payment methods as indicated on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Shipping and Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will make every effort to ship your order within the timeframe specified. However, we are not responsible for delays caused by shipping carriers, customs, or other factors beyond our control. Risk of loss and title pass to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Returns and Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Items may be returned within 30 days of purchase in original condition with all packaging and accessories. Refunds will be processed within 14 business days of receipt. Shipping costs are non-refundable unless the return is due to our error.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall shxdowmouse, its suppliers, or other third parties mentioned on this site be liable for any damages (including, without limitation, incidental and consequential damages, personal injury, lost profits, or damages resulting from lost data or business interruption) resulting from the use of or inability to use the materials on this site, even if we or our authorized representative has been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on shxdowmouse's website are provided for informational purposes only. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of shxdowmouse or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to use this website for any unlawful purpose or in any way that infringes upon the rights of others or restricts their use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the flow of dialogue within the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Modification of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which shxdowmouse operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at support@shxdowmouse.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
