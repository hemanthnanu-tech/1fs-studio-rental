import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  if (!images || images.length === 0) return null;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
        {/* Ambient Blur Background */}
        <AnimatePresence>
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 bg-cover bg-center opacity-35 blur-3xl scale-125"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 z-0 bg-black/75" />

        {/* Close */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-5 right-5 z-50 p-2.5 bg-white/10 text-white rounded-xl backdrop-blur-xl border border-white/20"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Counter */}
        <div className="absolute top-5 left-5 z-50 px-4 py-2 bg-white/10 text-white text-[11px] font-mono font-bold tracking-widest rounded-xl backdrop-blur-xl border border-white/20 flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5 text-[var(--ori-accent)]" />
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main Image Viewer */}
        <div className="relative w-full h-full flex items-center justify-center px-16 sm:px-24 pb-20">
          {images.length > 1 && (
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.92 }}
              onClick={goPrev}
              className="absolute left-3 sm:left-6 z-50 p-3 bg-white/10 text-white rounded-xl backdrop-blur-xl border border-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          )}

          <div className="relative w-full max-w-3xl flex items-center justify-center">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.img
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] rounded-2xl"
              />
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.92 }}
              onClick={goNext}
              className="absolute right-3 sm:right-6 z-50 p-3 bg-white/10 text-white rounded-xl backdrop-blur-xl border border-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto hide-scrollbar z-50">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                idx === currentIndex
                  ? "border-[var(--ori-accent)] shadow-[0_0_12px_rgba(226,255,61,0.5)] w-10 h-10"
                  : "border-white/15 opacity-50 hover:opacity-90 w-8 h-8"
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt="" />
            </motion.button>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
}
