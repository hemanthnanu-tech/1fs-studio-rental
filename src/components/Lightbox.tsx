import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
        {/* Ambient Blur Background Image */}
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 blur-3xl scale-110"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
        <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-md" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl transition-all border border-white/20 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 z-50 px-5 py-2.5 bg-white/10 text-white text-xs font-mono font-bold tracking-widest rounded-full backdrop-blur-xl border border-white/20 flex items-center gap-3">
          <ImageIcon className="w-4 h-4 opacity-60" />
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main Image Viewer */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-10">
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 sm:left-10 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl transition-all border border-white/20 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-[90vw] max-h-[78vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl"
          />

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 sm:right-10 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl transition-all border border-white/20 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Thumbnails (Optional bottom strip if many images, but keeping it clean for now) */}
        <div className="absolute bottom-8 w-full flex justify-center gap-3 px-6 overflow-x-auto hide-scrollbar pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-14 w-14 sm:h-18 sm:w-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                idx === currentIndex 
                  ? "border-white scale-110 shadow-[0_0_16px_rgba(255,255,255,0.3)] z-10" 
                  : "border-white/20 opacity-45 hover:opacity-85 hover:scale-105"
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
              {idx === currentIndex && <div className="absolute inset-0 bg-white/5" />}
            </button>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
