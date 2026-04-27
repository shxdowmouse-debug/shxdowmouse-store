import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Zap, Gauge, Radio, Weight } from "lucide-react";
import { Button } from "./ui/button";

interface ProductFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  productName: string;
  productDescription: string;
  images?: string[];
}

const PRODUCT_SPECS = {
  sensor: {
    icon: Gauge,
    label: "Sensor",
    specs: ["PAW3311 Optical", "Max 25000 DPI", "400 IPS Tracking", "40G Acceleration"]
  },
  connectivity: {
    icon: Radio,
    label: "Connectivity",
    specs: ["Wired", "2.4GHz Wireless", "Bluetooth", "1000Hz Polling"]
  },
  design: {
    icon: Weight,
    label: "Design",
    specs: ["25g Ultralight", "Symmetrical Right-handed", "PTFE Skates", "Ergonomic Shape"]
  },
  switches: {
    icon: Zap,
    label: "Switches",
    specs: ["HUANO Blue Shell Pink Dot", "80M Clicks (Main)", "F-Switch Scroll - 50K", "500mAh Battery"]
  }
};

export function ProductFullscreenModal({
  isOpen,
  onClose,
  productImage,
  productName,
  productDescription,
  images = [productImage]
}: ProductFullscreenModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 mt-8">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center justify-center gap-4"
              >
                {/* Main Image */}
                <div className="relative w-full aspect-square bg-black/60 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${productName} - View ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/80">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <div className="flex gap-4 w-full">
                    <Button
                      onClick={goToPrevImage}
                      size="icon"
                      className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={goToNextImage}
                      size="icon"
                      className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Thumbnail Indicators */}
                {images.length > 1 && (
                  <div className="flex gap-2 w-full">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info & Specs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-8"
              >
                {/* Product Title & Description */}
                <div>
                  <h1 className="text-4xl font-display font-bold mb-4 text-white capitalize">
                    {productName}
                  </h1>
                  <p className="text-white/70 leading-relaxed">
                    {productDescription}
                  </p>
                </div>

                {/* Quick Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(PRODUCT_SPECS).map(([key, spec]) => {
                    const Icon = spec.icon;
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + Object.keys(PRODUCT_SPECS).indexOf(key) * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-white/60" />
                          <h3 className="font-semibold text-sm text-white">{spec.label}</h3>
                        </div>
                        <ul className="space-y-1">
                          {spec.specs.map((item, idx) => (
                            <li key={idx} className="text-xs text-white/50">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <Button className="w-full h-12 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                  Stay Updated
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
