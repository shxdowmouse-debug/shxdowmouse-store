import { Link } from "wouter";
import { ChevronLeft, Scale, FileText, AlertCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-foreground relative overflow-hidden"
    >
      {/* Legal-themed background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />

      <header className="border-b border-white/10 sticky top-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft size={18} />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-8 h-8 text-white/60" />
            <h1 className="text-5xl font-display font-bold">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground mb-12">Last updated: 21st December 2025</p>
        </motion.div>

        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-white/50" />
              Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the shxdowmouse website and purchasing our products, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-white/50" />
              Product Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide accurate product descriptions, specifications, and pricing information. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. Product images are for illustration purposes and may differ slightly from the actual product.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Pricing and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are listed in USD and are subject to change without notice. We reserve the right to limit or refuse any order. Payment must be received before order shipment. We accept all major credit cards and payment methods as indicated on our website.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Shipping and Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will make every effort to ship your order within the timeframe specified. However, we are not responsible for delays caused by shipping carriers, customs, or other factors beyond our control. Risk of loss and title pass to you upon delivery to the carrier.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Returns and Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Items may be returned within 30 days of purchase in original condition with all packaging and accessories. Refunds will be processed within 14 business days of receipt. Shipping costs are non-refundable unless the return is due to our error.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-white/50" />
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall shxdowmouse, its suppliers, or other third parties mentioned on this site be liable for any damages (including, without limitation, incidental and consequential damages, personal injury, lost profits, or damages resulting from lost data or business interruption) resulting from the use of or inability to use the materials on this site, even if we or our authorized representative has been advised of the possibility of such damages.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on shxdowmouse's website are provided for informational purposes only. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of shxdowmouse or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to use this website for any unlawful purpose or in any way that infringes upon the rights of others or restricts their use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the flow of dialogue within the website.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Modification of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which shxdowmouse operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at support@shxdowmouse.com.
            </p>
          </motion.section>
        </div>
      </main>
    </motion.div>
  );
}
