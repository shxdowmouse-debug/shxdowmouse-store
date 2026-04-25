import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";

export default function UnsubscribePage() {
  const [location] = useLocation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "success" | "error">("loading");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Extract email from query parameter
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    
    if (emailParam) {
      setEmail(emailParam);
      setStatus("ready");
    } else {
      setStatus("error");
    }
  }, []);

  const handleUnsubscribe = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      setStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#1a1a1a] text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
          {/* Loading State */}
          {status === "loading" && (
            <div className="text-center">
              <div className="animate-spin w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white/50">Loading...</p>
            </div>
          )}

          {/* Ready State */}
          {status === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="p-4 bg-yellow-600/20 rounded-lg border border-yellow-600/50">
                  <Mail className="w-8 h-8 text-yellow-300" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-display font-bold mb-2">Unsubscribe</h1>
                <p className="text-white/50">We're sad to see you go</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-sm text-white/70 mb-2">Email:</p>
                <p className="font-mono text-white break-all">{email}</p>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                Clicking below will remove you from our waitlist and you won't receive any further emails from us.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleUnsubscribe}
                  disabled={isProcessing}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  {isProcessing ? "Unsubscribing..." : "Confirm Unsubscribe"}
                </Button>

                <Button
                  onClick={() => window.location.href = "/"}
                  variant="outline"
                  className="w-full border-white/10 text-white hover:bg-white/5"
                >
                  Go Back Home
                </Button>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="p-4 bg-green-600/20 rounded-lg border border-green-600/50">
                  <CheckCircle className="w-8 h-8 text-green-300" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-display font-bold mb-2">Unsubscribed</h1>
                <p className="text-white/50">You've been removed from our waitlist</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                <p className="text-sm text-white/70 mb-2">Email removed:</p>
                <p className="font-mono text-white/80 break-all">{email}</p>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                You won't receive any further emails from shxdowmouse. If you change your mind, you can sign up again anytime.
              </p>

              <Button
                onClick={() => window.location.href = "/"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Back to Homepage
              </Button>
            </motion.div>
          )}

          {/* Error State */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="p-4 bg-red-600/20 rounded-lg border border-red-600/50">
                  <AlertCircle className="w-8 h-8 text-red-300" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-display font-bold mb-2">Error</h1>
                <p className="text-white/50">Something went wrong</p>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                {!email
                  ? "No email address was provided. Please check the unsubscribe link in your email."
                  : "We couldn't process your unsubscribe request. Please try again later."}
              </p>

              <Button
                onClick={() => window.location.href = "/"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Back to Homepage
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
