'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import HeroSection from "./components/HeroSection/HeroSection";
import CircleAwards from "./components/CircleAwards/CircleAwards";
import Footer from "./components/Footer/Footer";

import './globals.css';

export default function Home() {

  //efeito imagens scroll
  const totoroRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress: totoroProgress } = useScroll({
    target: totoroRef,
    offset: ["start end", "center center"]
  });
  const totoroY = useTransform(totoroProgress, [0, 1], [150, 0]);
  const totoroOpacity = useTransform(totoroProgress, [0, 0.1], [0, 1]);

  const ponyoRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress: ponyoProgress } = useScroll({
    target: ponyoRef,
    offset: ["start end", "center center"]
  });
  const ponyoY = useTransform(ponyoProgress, [0, 1], [150, 0]);
  const ponyoOpacity = useTransform(ponyoProgress, [0, 0.1], [0, 1]);

  return (
    <>
      <main className="min-h-[250vh] w-full m-0">
        <HeroSection />

        <section className="relative z-20 min-h-screen">

          {/* SOBRE NOS */}
          <article ref={totoroRef} className="relative w-full font-franklin mt-32 py-12">
            <div className="pointer-events-none absolute -top-30 -left-20 z-0">
              <img
                src="/img/blurHome.svg"
                alt=""
                className="h-[600px] w-[600px] max-w-none"
              />
            </div>

            <div className="relative z-10 mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
              <div className="relative flex flex-col items-start justify-center pt-10">
                <h2 className="relative z-10 font-bodoni text-2xl w-full pl-10 whitespace-nowrap font-bold tracking-wide text-[#0b5e02] sm:text-6xl lg:text-7xl">
                  SOBRE NÓS
                </h2>

                <div className="relative z-20 -mt-16 sm:-mt-14">
                  <motion.img
                    src="/img/totoroHome.svg"
                    alt="Personagem totoro em um galho de árvore"
                    className="aboutImage w-full max-w-[450px] object-contain"
                    style={{ y: totoroY, opacity: totoroOpacity }}
                  />
                </div>
              </div>

              <div className="relative flex flex-col items-start gap-6 px-12 lg:items-end lg:text-right">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-0 lg:translate-x-1/2 -z-10">
                  <img
                    src="/img/blurHome.svg"
                    alt=""
                    className="h-[500px] w-[500px] max-w-none opacity-80"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                  }}
                  className="max-w-lg font-franklin text-base font-medium leading-relaxed text-gray-900 sm:text-lg"
                >
                  Bem-vindo ao nosso acervo dedicado ao Studio Ghibli! Este espaço foi criado por fãs e para fãs com o objetivo de celebrar, catalogar e preservar a rica história por trás de um dos estúdios de animação mais amados e influentes do mundo.
                </motion.p>

                <a
                  href="#"
                  className="group flex items-center gap-6 font-medium rounded-full bg-[#086a08] px-4 py-2 text-lg text-white transition-all hover:bg-[#065006]"
                >
                  Ver Filmes
                  <span className="flex h-12 w-12 items-center font-normal justify-center rounded-full bg-white text-black text-4xl pb-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </article>


          {/* HISTORIA */}
          <article ref={ponyoRef} className="relative w-full font-franklin mt-32 py-12">

            <div className="pointer-events-none absolute -top-30 -left-20 z-0">
              <img
                src="/img/lineBlur.svg"
                alt=""
                className="w-100wh max-w-none"
              />
            </div>

            <div className="relative z-10 mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
              <div className="relative flex flex-col items-start gap-6 px-12 lg:items-end lg:text-right">
                <motion.p
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                  }}
                  className="max-w-lg font-franklin text-base font-medium leading-relaxed text-gray-900 sm:text-lg"
                >
                  Fundado em 1985 por Hayao Miyazaki, Isao Takahata e Toshio Suzuki,
                  o Studio Ghibli nasceu do sucesso de Nausicaä do Vale do Vento e revolucionou
                  o cinema ao priorizar a animação tradicional e a autoria artística. O estúdio
                  japonês conquistou o mundo com histórias emocionantes, belas paisagens, forte
                  apelo ecológico e personagens marcantes, acumulando prêmios internacionais de
                  prestígio — incluindo dois Oscars — e se tornando um dos maiores e mais
                  influentes nomes da história da animação mundial.
                </motion.p>
              </div>

              <div className="relative flex flex-col items-start justify-center pt-10">
                <h2 className="relative z-10 font-bodoni text-2xl w-full pl-10 whitespace-nowrap font-bold tracking-wide text-[#0b5e02] sm:text-6xl lg:text-7xl">
                  HISTÓRIA
                </h2>

                <div className="relative z-20 -mt-16 sm:-mt-20">
                  <motion.img
                    src="/img/ponyoHome.svg"
                    alt="Personagem ponyo em um barco"
                    className="aboutImage w-full max-w-[450px] object-contain"
                    style={{ y: ponyoY, opacity: ponyoOpacity }}
                  />
                </div>
              </div>

            </div>
          </article>

          {/* PREMIAÇÕES */}
          <CircleAwards />

          {/* DIRETORES */}
          <article className="relative w-full max-w-5xl mx-auto mt-24 py-12 px-6 overflow-hidden">
            <h2 className="relative z-10 font-bodoni text-5xl md:text-7xl font-bold tracking-wide text-[#0b5e02] mb-8">
              DIRETORES
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20">
              <div className="relative flex flex-col items-center shrink-0 w-full md:w-[320px]">
                <img
                  src="/img/Hayao.png"
                  alt="Foto de Hayao Miyazaki"
                  className="w-full h-[260px] object-cover shadow-sm"
                />

                <motion.img
                  src="/img/Susuwatari.png"
                  alt="Susuwatari"
                  className="absolute bottom-6 -right-5 z-20 w-16 md:w-20 pointer-events-none drop-shadow-md"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <span className="font-semibold text-gray-900 text-sm mt-3 text-center">
                  Hayao Miyazaki - 宮崎 駿
                </span>
              </div>

              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                  }}
                  className="max-w-lg font-franklin text-base font-medium leading-relaxed text-gray-900 sm:text-lg"
                >
                  Hayao Miyazaki foi um dos cofundadores do Studio Ghibli e um mestre da
                  animação japonesa, tendo dirigido os seguintes filmes no estúdio: O
                  Castelo no Céu, Meu Amigo Totoro, O Serviço de Entregas da Kiki, Porco
                  Rosso: O Último Herói, Princesa Mononoke, A Viagem de Chihiro, O Castelo
                  Animado, Ponyo: Uma Amizade que Veio do Mar, Vidas ao Vento e O Menino e
                  a Garça.
                </motion.p>
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                  }}
                  className="max-w-lg font-franklin text-base font-medium leading-relaxed text-gray-900 sm:text-lg"
                >
                  Isao Takahata foi um dos cofundadores do Studio Ghibli e um mestre da
                  animação japonesa, conhecido por seu realismo profundo e narrativas
                  intimistas, tendo dirigido os seguintes filmes no estúdio: Túmulo dos
                  Vagalumes, Memórias de Ontem, PomPoko: A Grande Batalha dos Guaxinins,
                  Meus Vizinhos os Yamadas e O Conto da Princesa Kaguya.
                </motion.p>
              </div>

              <div className="relative flex flex-col items-center shrink-0 w-full md:w-[320px]">
                <img
                  src="/img/Isao.png"
                  alt="Foto de Isao Takahata"
                  className="w-full h-[260px] object-cover shadow-sm"
                />

                <motion.img
                  src="/img/Susuwatari.png"
                  alt="Susuwatari"
                  className="absolute bottom-6 -left-5 z-20 w-16 md:w-20 pointer-events-none drop-shadow-md"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />

                <span className="font-semibold text-gray-900 text-sm mt-3 text-center">
                  Isao Takahata - 高畑 勲
                </span>
              </div>
            </div>
          </article>

          <article className="relative flex flex-col items-center justify-center py-24 min-h-[400px] overflow-hidden">
            {/* Fundo Blur Centralizado */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <img
                src="/img/blurWiki.svg"
                alt=""
                className="h-[600px] w-[600px] max-w-none opacity-90"
              />
            </div>

            {/* Conteúdo Centralizado */}
            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              <p className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
                Descubra mais na wiki
              </p>

              <a
                href="https://ghibli.fandom.com/wiki/Studio_Ghibli"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 font-medium rounded-full bg-[#086a08] px-4 py-2 text-lg text-white transition-all hover:bg-[#065006]"
              >
                Redirecionar para a wiki
                <span className="flex h-12 w-12 items-center font-normal justify-center rounded-full bg-white text-black text-4xl pb-1">
                  ↗
                </span>
              </a>
            </div>
          </article>

        </section>

        <Footer />
      </main>
    </>
  );
}
