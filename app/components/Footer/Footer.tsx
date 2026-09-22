"use client";

import { JSX, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

export default function Footer(): JSX.Element {
  // Caminho SVG inicial
  const down = "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";
  const center = "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z";

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".footer",
      start: "top bottom",
      onEnter: (self: ScrollTrigger) => {
        const velocity = self.getVelocity();
        const variation = velocity / 10000;

        gsap.fromTo(
          "#bouncy-path",
          { morphSVG: down },
          {
            duration: 2,
            morphSVG: center,
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: true,
          }
        );
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer className="footer relative mt-28 w-full min-h-[420px] flex flex-col justify-between">
      <img
        src="/img/totorinho.svg"
        alt="Totorinho"
        className="absolute top-0 -translate-y-[82%] left-6 md:left-16 z-[10] w-20 md:w-28 pointer-events-none drop-shadow-sm"
      />

      {/* SVG do fundo verde */}
      <svg
        preserveAspectRatio="none"
        id="footerImg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2278 683"
        className="absolute inset-0 w-full h-full z-[1]"
      >
        <defs>
          <linearGradient id="grad-1" x1="0" y1="0" x2="2278" y2="683">
            <stop offset="0.2" stopColor="#026E00" />
            <stop offset="0.8" stopColor="#026E00" />
          </linearGradient>
        </defs>
        <path
          id="bouncy-path"
          fill="url(#grad-1)"
          d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z"
          className="absolute bottom-0 left-0 w-full h-full z-[1]"
        />
      </svg>

      <section className="relative z-[3] flex flex-wrap justify-center md:justify-start text-center md:text-left gap-10 md:gap-24 pt-16 md:pt-20 px-8 md:px-24 pb-12">
        <div>
          <h4 className="text-white font-bold text-xl mb-4">Web</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5 items-center md:items-start">
            <li>
              <a
                href="#sobre-nos"
                className="text-white text-[0.95rem] opacity-90 no-underline hover:opacity-100 hover:underline"
              >
                Sobre Nós
              </a>
            </li>
            <li>
              <a
                href="#historia"
                className="text-white text-[0.95rem] opacity-90 no-underline hover:opacity-100 hover:underline"
              >
                História
              </a>
            </li>
            <li>
              <a
                href="#premiacoes"
                className="text-white text-[0.95rem] opacity-90 no-underline hover:opacity-100 hover:underline"
              >
                Premiações
              </a>
            </li>
            <li>
              <a
                href="#diretores"
                className="text-white text-[0.95rem] opacity-90 no-underline hover:opacity-100 hover:underline"
              >
                Diretores
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xl mb-4">Contato</h4>
          <p className="text-white text-[0.95rem] opacity-90 m-0">+11 111 222 2424</p>
          <p className="text-white text-[0.95rem] opacity-90 m-0 mb-3">ghiblicolection@gmail.com</p>

          <div className="flex gap-[14px] justify-center md:justify-start">
            <a
              href="#"
              aria-label="Instagram"
              className="flex items-center justify-center text-white opacity-90 hover:opacity-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="X"
              className="flex items-center justify-center text-white opacity-90 hover:opacity-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Site"
              className="flex items-center justify-center text-white opacity-90 hover:opacity-100"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <img
        src="/img/totorof.svg"
        alt="Logo Totoro"
        className="absolute z-[2] pointer-events-none right-1/2 translate-x-1/2 bottom-[40px] w-[260px] max-w-[60vw] opacity-35 md:right-[5%] md:translate-x-0 md:bottom-[30px] md:w-[420px] md:max-w-[40vw] md:opacity-90"
      />

      <div className="relative z-[3] bg-white text-center py-2 w-full mt-auto">
        <p className="text-gray-900 text-xs md:text-sm font-medium m-0">
          © 2026 Studio Ghibli Inc. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  );
}