"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 py-8">
      <div className="container flex items-center justify-between bg-black/60 backdrop-blur-xl py-5 px-10 rounded-full border border-white/10 shadow-2xl">
        <Link href="/" className="relative w-44 h-12 block">
          <div className="relative w-full h-full">
            <Image
              src="/logo.png"
              alt="SkullDevs Logo"
              fill
              className="object-contain"
              style={{ filter: 'invert(1)', transform: 'scale(1.1)' }}
              priority
            />
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.3em]">
          <Link href="#services" className="text-gray-400 hover:text-accent transition-all">Servicios</Link>
          <Link href="#casos" className="text-gray-400 hover:text-accent transition-all">Casos de Éxito</Link>
          <Link href="#contact" className="btn-primary ml-6">Hablemos</Link>
        </div>
      </div>
    </nav>
  );
}
