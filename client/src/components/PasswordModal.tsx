import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  title?: string;
  description?: string;
}

export function PasswordModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  title = "Enter Password",
  description = "Please enter the password to continue"
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      onSubmit(password);
      setPassword("");
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="space-y-4">
        <p className="text-white/70 text-sm">{description}</p>
        
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Enter password"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
              disabled={loading}
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex-1 border-white/10 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-white text-black hover:bg-white/90"
          >
            {loading ? "Checking..." : "Submit"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
