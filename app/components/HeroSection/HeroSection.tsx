'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';


export default function HeroSection() {

    const containerRef = useRef<HTMLDivElement>(null);

    //animação scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)']);


  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#D7E0B7]">

        <motion.div
        style={{
            scale: heroScale,
            opacity: heroOpacity,
            filter: heroBlur
        }}
        className="
          sticky top-0 z-10 flex h-screen w-full flex-col justify-center items-center text-left text-white
          bg-[url('/img/fundo2.jpg')] bg-cover bg-center bg-no-repeat
          [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]
          [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]
        "
        >
        <h1 className="absolute left-0 bottom-20 px-4 text-4xl font-bodoni font-bold text-white tracking-tight w-2xl sm:text-6xl lg:text-7xl">
          STUDIO GHIBLI COLLECTION
        </h1>

        <div className="absolute bottom-10 flex flex-col items-center gap-3">
          <div
            className="
              relative h-[60px] w-[34px] rounded-full border-2 border-white/80
              before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2
              before:h-2.5 before:w-2.5 before:rounded-full before:bg-white
              before:animate-[scroll-dot_1.5s_infinite]
            "
          />
        </div>            
        </motion.div>

    </div>
  )
}
