import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jezcois Reuben Garganza",
  description: "Hello there! :)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="links">
          <nav>
            <Link href="/">Home</Link>
            <Link href="">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="">Contacts</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
