import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Zap, Gauge, Radio, Weight, Droplet, Lightbulb } from "lucide-react";
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
    specs: ["PAW3311 Optical", "Max 25,000 DPI", "400 IPS Tracking", "40G Acceleration"]
  },
  connectivity: {
    icon: Radio,
    label: "Connectivity",
    specs: ["Wired & 2.4GHz", "Bluetooth Support", "1000Hz Polling Rate", "Multiple connections"]
  },
  design: {
    icon: Weight,
    label: "Build",
    specs: ["25g Ultralight", "Ergonomic Shape", "PTFE Skates", "symmetrical Grip"]
  },
  switches: {
    icon: Zap,
    label: "Switches",
    specs: ["80M Click Buttons", "50K Scroll Wheel", "HUANO Switches", "Durability tested"]
  },
  battery: {
    icon: Droplet,
    label: "Power",
    specs: ["500mAh Battery", "Extended Runtime", "Fast Charging", "Reliable wireless"]
  },
  colors: {
    icon: Lightbulb,
    label: "Options",
    specs: ["Black", "White", "Berry Red", "No RGB needed"]
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextImage();
    }
    if (isRightSwipe) {
      goToPrevImage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/98 backdrop-blur-xl flex items-center justify-center z-50 p-2 md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-[95vh] max-w-7xl bg-gradient-to-b from-black/50 via-black/40 to-black/50 border border-white/10 rounded-3xl p-4 md:p-8 lg:p-12 overflow-y-auto scrollbar-hide"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main Content - 3 Column Layout */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 h-full">
              {/* Left: Image Gallery - Larger */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-2 flex flex-col items-center justify-center gap-4"
              >
                {/* Main Image - Full Height */}
                <div
                  ref={galleryRef}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="relative w-full flex-1 bg-gradient-to-b from-black/40 to-black/20 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 cursor-grab active:cursor-grabbing group"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${productName} - View ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </AnimatePresence>
                  
                  {/* Image Counter Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white/90 font-medium border border-white/10">
                    {currentImageIndex + 1} <span className="text-white/50">/ {images.length}</span>
                  </div>

                  {/* Swipe Hint */}
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white/30 text-xs">← Swipe</div>
                      <div className="text-white/30 text-xs">Swipe →</div>
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                {images.length > 1 && (
                  <div className="w-full space-y-4">
                    <div className="flex gap-3">
                      <Button
                        onClick={goToPrevImage}
                        size="lg"
                        className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Previous
                      </Button>
                      <Button
                        onClick={goToNextImage}
                        size="lg"
                        className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
                      >
                        Next
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>

                    {/* Thumbnail Indicators */}
                    <div className="flex gap-2 w-full">
                      {images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`h-2.5 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white flex-grow"
                              : "bg-white/20 hover:bg-white/40 flex-1"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Right: Product Info & Specs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Product Title & Description */}
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white capitalize leading-tight">
                    {productName}
                  </h1>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">
                    {productDescription}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-white/90">Key Specs</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(PRODUCT_SPECS).map(([key, spec]) => {
                      const Icon = spec.icon;
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + Object.keys(PRODUCT_SPECS).indexOf(key) * 0.05 }}
                          className="bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-xl p-3 hover:from-white/12 hover:to-white/6 transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-4 h-4 text-white/70 group-hover:text-white/90 transition-colors" />
                            <h3 className="font-semibold text-xs md:text-sm text-white">{spec.label}</h3>
                          </div>
                          <ul className="space-y-0.5">
                            {spec.specs.map((item, idx) => (
                              <li key={idx} className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                                ◆ {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-auto pt-4"
                >
                  <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-white to-white/90 text-black font-bold hover:from-white/95 hover:to-white/85 transition-all shadow-lg hover:shadow-xl">
                    Stay Updated
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
