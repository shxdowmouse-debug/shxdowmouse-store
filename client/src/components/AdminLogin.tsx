import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Shield } from "lucide-react";

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needs2FA, setNeeds2FA] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // First, check if 2FA is needed
      const response = await fetch("/api/admin/2fa/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token: "check" }),
      });

      if (response.status === 400) {
        // 2FA is required
        setNeeds2FA(true);
        setTwoFACode("");
      } else if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        onLogin(data.token);
      } else {
        setError("Invalid admin password");
      }
    } catch (error) {
      setError("Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/2fa/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token: twoFACode }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        onLogin(data.token);
      } else {
        setError("Invalid 2FA code");
      }
    } catch (error) {
      setError("Failed to verify 2FA code");
    } finally {
      setLoading(false);
    }
  };

  if (needs2FA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#1a1a1a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-4"
              >
                <div className="p-4 bg-gradient-to-br from-green-600 to-green-400 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                2FA Verification
              </h1>
              <p className="text-white/50">Enter your authenticator code</p>
            </div>

            {/* Form */}
            <form onSubmit={handle2FASubmit} className="space-y-4">
              <div>
                <label htmlFor="twoFACode" className="block text-sm font-medium text-white mb-2">
                  Authenticator Code
                </label>
                <input
                  id="twoFACode"
                  type="text"
                  inputMode="numeric"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 transition-colors text-center text-2xl tracking-widest"
                  disabled={loading}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-600/20 border border-red-600/50 text-red-300 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading || twoFACode.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setNeeds2FA(false);
                  setPassword("");
                  setError("");
                }}
                variant="outline"
                className="w-full text-white border-white/20 hover:bg-white/5"
              >
                Back
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-[#1a1a1a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-4"
            >
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-white/50">Enter your admin password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                disabled={loading}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-600/20 border border-red-600/50 text-red-300 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xs text-white/50">
              🔒 <strong>Secure:</strong> This admin panel is protected by a password and optional 2FA. Set <code className="text-white/70">ADMIN_PASSWORD</code> environment variable on your server.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
