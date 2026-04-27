import { Modal } from "./Modal";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "info" | "success" | "error" | "warning";
  onConfirm?: () => void;
  showCancel?: boolean;
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  onConfirm,
  showCancel = false,
}: AlertModalProps) {
  const iconColor = {
    info: "text-blue-400",
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className={`w-6 h-6 ${iconColor[type]}`} />;
      case "error":
      case "warning":
        return <AlertCircle className={`w-6 h-6 ${iconColor[type]}`} />;
      default:
        return <Info className={`w-6 h-6 ${iconColor[type]}`} />;
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">{getIcon()}</div>
          <p className="text-white/80 leading-relaxed flex-1">{message}</p>
        </div>

        <div className="flex gap-3">
          {showCancel && (
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/10 hover:bg-white/5"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            className={`flex-1 ${
              type === "error"
                ? "bg-red-600 hover:bg-red-700"
                : type === "warning"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : type === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {showCancel ? "Confirm" : "OK"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
