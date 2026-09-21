'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';


interface Slider {
  id: number;
  image: string;
  title: string;
  description: string;
}

const defaultSlides: Slider[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    title: 'Aesthetic Art Gallery',
    description: 'Explore modern and contemporary visual arts.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1200&auto=format&fit=crop',
    title: 'Serene Landscapes',
    description: 'Breathtaking views captured around the globe.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    title: 'Natural Wonders',
    description: 'Immersive depths of forests and mountains.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
    title: 'The Great Outdoors',
    description: 'Venture into the wild paths of discovery.',
  },
];

interface FramerCarouselThumbnailsProps {
  slides?: Slider[];
}

export default function FramerCarouselThumbnails({ slides = defaultSlides }: FramerCarouselThumbnailsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-neutral-950 p-4 md:p-6 shadow-2xl">
      {/* Container Principal do Slide Ativo */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl">
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
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="h-full w-full object-cover"
            />
            {/* Gradiente escuro para legibilidade do texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Conteúdo de Texto */}
            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-10 md:left-10">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold md:text-4xl"
              >
                {slides[currentIndex].title}
              </motion.h3>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-sm text-neutral-300 md:text-base max-w-xl"
              >
                {slides[currentIndex].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botões de Navegação (Next / Prev) */}
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80"
            aria-label="Slide anterior"
          >
            seta
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80"
            aria-label="Próximo slide"
          >
            seta
          </button>
        </div>
      </div>

      {/* Barra de Miniaturas (Thumbnails com expansão animada) */}
      <div className="mt-4 flex items-center justify-center gap-3 overflow-x-auto pb-2">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 focus:outline-none ${
                isActive ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
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
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-black/10 border border-white/30 rounded-lg" />
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}