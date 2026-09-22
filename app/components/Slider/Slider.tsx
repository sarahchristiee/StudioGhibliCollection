'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SliderProps {
  images?: string[];
}

export default function Slider({ images = [] }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden p-4 md:p-6">
      <div className="relative h-[400px] md:h-[430px] 2xl:h-[500px] w-full overflow-hidden rounded-xl">

        {/* img principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="h-full w-full object-cover rounded-xl"
            />
          </motion.div>
        </AnimatePresence>

        {/* Botões Navegação */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white backdrop-blur-md transition"
            aria-label="Slide anterior"
          >
            {/* esquer */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white backdrop-blur-md transition"
            aria-label="Próximo slide"
          >
            {/* diret */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* miniatura */}
      <div className="mt-4 flex items-center justify-center gap-3 overflow-x-auto pb-2">
        {images.map((imagePath, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 focus:outline-none ${
                isActive ? '' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <motion.div
                animate={{
                  width: isActive ? 100 : 60,
                  height: 60,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative h-[60px]"
              >
                <img
                  src={imagePath}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 rounded-lg" />
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}