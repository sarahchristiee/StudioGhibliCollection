'use client';

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { motion, AnimatePresence } from "framer-motion";
import premiosData from "../../../public/CircleAwards.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

type PremioDetail = Record<string, string>;
type PremiosMap = Record<string, PremioDetail>;

type CharacterData = {
  id: string;
  poster: string;
  centerPoster: string;
  titulo: string;
  premios: PremiosMap;
};

const charactersData = Object.values(premiosData) as CharacterData[];

export default function CircleAwards() {
  const containerRef = useRef<HTMLElement>(null);
  const wheelLeftRef = useRef<HTMLDivElement>(null);
  const wheelRightRef = useRef<HTMLDivElement>(null);
  
  const leftCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedCard, setSelectedCard] = useState<CharacterData | null>(null);

  const handleCardClick = (char: CharacterData) => {
    setSelectedCard((prev) => (prev?.id === char.id ? null : char));
  };

  const getCardStyle = (charId: string) => {
    if (!selectedCard) {
      return "grayscale-0 hover:scale-105";
    }
    if (selectedCard.id === charId) {
      return "grayscale-0 scale-105 ring-2 ring-[#1b7a18]";
    }
    return "grayscale group-hover:grayscale-0 group-hover:scale-105";
  };

  useEffect(() => {
    if (!charactersData.length) return;

    const ctx = gsap.context(() => {
      const setupWheel = (
        cards: (HTMLDivElement | null)[],
        wheel: HTMLDivElement | null,
        radius: number,
        isLeft: boolean
      ) => {
        const validCards = cards.filter(Boolean) as HTMLDivElement[];
        if (!validCards.length || !wheel) return;
        
        const angleStep = 360 / validCards.length;

        // 1. Posicionamento geométrico num círculo perfeito
        validCards.forEach((card, i) => {
          const angle = angleStep * i;
          const theta = (angle * Math.PI) / 180;

          gsap.set(card, {
            x: Math.cos(theta) * radius,
            y: Math.sin(theta) * radius,
            transformOrigin: "center center",
          });
        });

        // orientação card
        const updateCardOrientations = () => {
          const wheelRot = (gsap.getProperty(wheel, "rotation") as number) || 0;

          validCards.forEach((card, i) => {
            const baseAngle = angleStep * i;
            
            // Normaliza o ângulo de tela entre -180 e 180 graus
            let screenAngle = (baseAngle + wheelRot) % 360;
            if (screenAngle > 180) screenAngle -= 360;
            if (screenAngle < -180) screenAngle += 360;

            let targetTilt = 0;

            if (isLeft) {
              // Roda Esquerda: centro visível está em 0°
              targetTilt = screenAngle * 0.2;
            } else {
              // Roda Direita: centro visível está em 180° (-180°)
              const diffFromCenter = screenAngle > 0 ? screenAngle - 180 : screenAngle + 180;
              targetTilt = diffFromCenter * 0.2;
            }

            // Cancela a rotação do container pai e aplica a inclinação desejada
            gsap.set(card, { rotation: targetTilt - wheelRot });
          });
        };

        let isDragging = false;
        const speedPerSecond = isLeft ? 8 : -8;

        const tick = (_time: number, deltaTime: number) => {
          if (!isDragging && wheel) {
            const currentRot = (gsap.getProperty(wheel, "rotation") as number) || 0;
            const deltaRot = (speedPerSecond * deltaTime) / 1000;
            gsap.set(wheel, { rotation: currentRot + deltaRot });
            updateCardOrientations();
          }
        };

        gsap.ticker.add(tick);

        Draggable.create(wheel, {
          type: "rotation",
          onPress: () => {
            isDragging = true;
          },
          onDrag: updateCardOrientations,
          onRelease: () => {
            isDragging = false;
          },
        });

        return () => {
          gsap.ticker.remove(tick);
        };
      };

      const responsiveRadius = window.innerWidth < 1200 ? 250 : 300;

      setupWheel(leftCardsRef.current, wheelLeftRef.current, responsiveRadius, true);
      setupWheel(rightCardsRef.current, wheelRightRef.current, responsiveRadius, false);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex justify-center items-center mt-[100px]"
    >
      {/* ================= RODA ESQUERDA ================= */}
      <div className="absolute top-1/2 left-0 w-0 h-0 flex items-center justify-center z-10">
        <div className="relative w-0 h-0 cursor-grab active:cursor-grabbing" ref={wheelLeftRef}>
          {charactersData.map((char, i) => (
            <div
              key={`left-${char.id}`}
              ref={(el) => { leftCardsRef.current[i] = el; }}
              onClick={() => handleCardClick(char)}
              className="absolute w-[110px] h-[145px] -top-[72px] -left-[55px] cursor-pointer flex items-center justify-center group"
            >
              <img
                src={char.poster}
                alt={char.titulo}
                className={`w-full h-full object-cover rounded-md shadow-md transition-all duration-300 cursor-grab ${getCardStyle(char.id)}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= CARD CENTRAL ================= */}
      <div className="relative z-50 flex flex-col items-center justify-center text-center w-full max-w-[500px] px-4">
        <h1 className="text-[#0b5e02] font-serif font-bold text-[clamp(36px,5vw,48px)] tracking-wide m-0 leading-none pointer-events-none uppercase">
          Premiações
        </h1>
        <p className="font-sans text-gray-700 text-xs font-semibold mt-2 mb-6">
          clique nos cards para visualizar
        </p>

        <div className="min-h-[280px] lg:-mb-30 w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {selectedCard && (
              <motion.div
                key={selectedCard.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative bg-white rounded-[10px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-row items-center gap-6 w-full max-w-[580px]"
              >
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-[#1b7a18] hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
                  aria-label="Fechar"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Poster */}
                <div className="w-[150px] h-[210px] shrink-0 overflow-hidden rounded-[8px] shadow-md">
                  <img
                    src={selectedCard.centerPoster}
                    alt={selectedCard.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Infos */}
                <div className="flex-1 flex flex-col text-left pr-3">
                  <h2 className="font-serif text-lg font-bold text-[#1b7a18] m-0 mb-3 leading-snug">
                    {selectedCard.titulo}
                  </h2>

                  {selectedCard.premios && (
                    <div className="w-full max-h-[160px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                      {Object.entries(selectedCard.premios).map(([evento, listaPremios]) => (
                        <div key={evento} className="mb-3 last:mb-0">
                          <h4 className="font-bold text-[#1b7a18] text-sm leading-tight">
                            {evento}
                          </h4>
                          <ul className="mt-1 space-y-1">
                            {Object.values(listaPremios).map((premio, idx) => (
                              <li
                                key={idx}
                                className="text-gray-900 text-xs flex items-start gap-1.5 font-medium leading-normal"
                              >
                                <span className="text-black font-bold">•</span>
                                <span>{premio}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= RODA DIREITA ================= */}
      <div className="absolute top-1/2 right-0 w-0 h-0 flex items-center justify-center z-10">
        <div className="relative w-0 h-0 cursor-grab active:cursor-grabbing" ref={wheelRightRef}>
          {charactersData.map((char, i) => (
            <div
              key={`right-${char.id}`}
              ref={(el) => { rightCardsRef.current[i] = el; }}
              onClick={() => handleCardClick(char)}
              className="absolute w-[110px] h-[145px] -top-[72px] -left-[55px] cursor-pointer flex items-center justify-center group"
            >
              <img
                src={char.poster}
                alt={char.titulo}
                className={`w-full h-full object-cover rounded-md shadow-md transition-all duration-300 cursor-grab ${getCardStyle(char.id)}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}