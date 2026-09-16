import type { Metadata } from "next";
import { Libre_Bodoni, Libre_Franklin } from 'next/font/google';
import "./globals.css";

const libreBodoni = Libre_Bodoni({
  subsets: ['latin'],
  variable: '--font-bodoni',
});

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-franklin',
});

export const metadata: Metadata = {
  title: "Studio Ghibli Collection",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${libreBodoni.variable} ${libreFranklin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
