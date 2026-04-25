import { Link } from "wouter";
import { ChevronLeft, Cookie, Settings2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Cookies() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    performance: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    if (key !== "essential") {
      setPreferences(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    alert("Cookie preferences saved!");
  };

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: true,
      performance: true,
    });
    localStorage.setItem("cookiePreferences", JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      performance: true,
    }));
    alert("All cookies accepted!");
  };

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      performance: false,
    });
    localStorage.setItem("cookiePreferences", JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      performance: false,
    }));
    alert("Cookie preferences updated!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-background text-foreground"
    >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-8 h-8" />
            <h1 className="text-5xl font-display font-bold">Cookie Preferences</h1>
          </div>
          <p className="text-muted-foreground mb-12">Manage how shxdowmouse uses cookies and tracking technologies</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/50 border border-white/10 rounded-3xl p-8 md:p-12 mb-8"
        >
          <div className="space-y-8">
            {/* Essential Cookies */}
            <motion.div
              whileHover={{ x: 8 }}
              className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 cursor-default"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground text-sm">
                  Required for the website to function properly. These cookies are always enabled and cannot be disabled.
                </p>
              </div>
              <div className="ml-4 text-green-500">
                <ToggleRight className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Analytics Cookies */}
            <motion.div
              whileHover={{ x: 8 }}
              className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-all"
              onClick={() => handleToggle("analytics")}
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground text-sm">
                  Help us understand how you use shxdowmouse to improve the user experience. These are anonymous and don't identify you personally.
                </p>
              </div>
              <div className="ml-4">
                {preferences.analytics ? (
                  <ToggleRight className="w-6 h-6 text-green-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-white/30" />
                )}
              </div>
            </motion.div>

            {/* Marketing Cookies */}
            <motion.div
              whileHover={{ x: 8 }}
              className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-all"
              onClick={() => handleToggle("marketing")}
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground text-sm">
                  Used to display personalized advertisements and measure marketing campaign effectiveness. You can disable these at any time.
                </p>
              </div>
              <div className="ml-4">
                {preferences.marketing ? (
                  <ToggleRight className="w-6 h-6 text-green-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-white/30" />
                )}
              </div>
            </motion.div>

            {/* Performance Cookies */}
            <motion.div
              whileHover={{ x: 8 }}
              className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-all"
              onClick={() => handleToggle("performance")}
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display mb-2">Performance Cookies</h3>
                <p className="text-muted-foreground text-sm">
                  Monitor website performance and loading times to ensure the best experience for our users.
                </p>
              </div>
              <div className="ml-4">
                {preferences.performance ? (
                  <ToggleRight className="w-6 h-6 text-green-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-white/30" />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleRejectAll}
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-2xl text-base font-semibold border-white/10 hover:bg-white/5 transition-all"
          >
            Reject All (except Essential)
          </Button>
          <Button
            onClick={handleSavePreferences}
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-2xl text-base font-semibold border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Settings2 className="w-5 h-5" />
            Save Preferences
          </Button>
          <Button
            onClick={handleAcceptAll}
            size="lg"
            className="h-12 px-8 rounded-2xl text-base font-semibold bg-white text-black hover:bg-white/90 transition-all"
          >
            Accept All
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-2xl font-display font-bold mb-4">About Cookies</h2>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help us improve your browsing experience and provide you with personalized content.
            </p>
            <p>
              You have the right to control whether cookies are placed on your device. Most web browsers allow you to manage cookie settings through their preferences or settings menu. However, please note that disabling cookies may impact your ability to use certain features of the website.
            </p>
            <p>
              For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" className="text-white hover:underline">AllAboutCookies.org</a> or your browser's help documentation.
            </p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
