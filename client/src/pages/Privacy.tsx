import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
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
        <h1 className="text-5xl font-display font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: 21st December 2025</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At shxdowmouse, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the site includes:
            </p>
            <ul className="text-muted-foreground leading-relaxed space-y-2 ml-4">
              <li>• Personal identification information (name, email address, phone number, etc.)</li>
              <li>• Shipping and billing address information</li>
              <li>• Payment information (processed securely through third-party providers)</li>
              <li>• Browsing and usage data</li>
              <li>• Device information and IP address</li>
              <li>• Communications and correspondence</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
            </p>
            <ul className="text-muted-foreground leading-relaxed space-y-2 ml-4 mt-4">
              <li>• Process your transactions and send related information</li>
              <li>• Email you regarding your order status and updates</li>
              <li>• Fulfill and manage your orders</li>
              <li>• Generate a personal profile about you</li>
              <li>• Increase the efficiency and operation of the site</li>
              <li>• Monitor and analyze usage and trends to improve your experience</li>
              <li>• Notify you about changes to our policies</li>
              <li>• Send you marketing and promotional communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Disclosure of Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share your information with third parties who perform services for us, including payment processors, shipping carriers, and customer service providers. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you advance notice, except as described in this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Security of Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use administrative, technical, and physical security measures to protect your personal information. However, we cannot guarantee complete security of any information transmitted online. You provide information at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser. You may disable cookies through your browser settings, though some features of the site may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites before providing your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications from us at any time by following the unsubscribe instructions in our emails or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our site is not designed for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information and terminate the child's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">UK Privacy Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you are located in the UK, you have specific rights regarding your personal information under the UK General Data Protection Regulation (UK GDPR). You have the right to know what personal information is collected, used, and shared. You also have the right to request access, correction, deletion, or portability of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this privacy policy, please contact us at shxdowmouse@gmail.com or through our website's contact form.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
