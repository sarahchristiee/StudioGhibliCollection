import { JSX } from "react";
import Link from "next/link";

export default function Header(): JSX.Element {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
            <div className="flex items-center justify-between px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-md transition-all">

                <a href="/" className="flex items-center gap-3 no-underline group">

                    <img src="/img/Susuwatari.png" alt="" className="w-10 h-10" />

                    <span className="font-serif text-[#0b5e02] font-bold text-lg md:text-xl tracking-tight">
                        studio ghibli collection
                    </span>
                </a>

                <nav className="flex items-center gap-6 md:gap-8">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-[#0b5e02] font-bold text-base md:text-lg no-underline hover:opacity-80 transition-opacity"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                        Início
                    </Link>

                    <Link
                        href="/Filmografia"
                        className="flex items-center gap-1.5 text-[#0b5e02] font-bold text-base md:text-lg no-underline hover:opacity-80 transition-opacity"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                        </svg>
                        Filmografia
                    </Link>
                </nav>

            </div>
        </header>
    );
}