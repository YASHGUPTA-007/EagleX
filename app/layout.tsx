import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import EagleCursor from "./Components/EagleCursor";
import SmoothScrolling from './Components/SmoothScrolling';
import Footer from "./Components/Footer";
import PageLoader from './Components/PageLoader';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eagle X",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <PageLoader />
        <SmoothScrolling />
        <Navbar/>
        <EagleCursor/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
