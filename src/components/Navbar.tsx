"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#services', label: 'Servicios' },
  { href: '#team', label: 'The Team' },
  { href: '#casos', label: 'Casos de Éxito' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link href="/" className="navbar__logo" onClick={handleLinkClick}>
            <Image
              src="/logo.png"
              alt="SkullDevs Logo"
              fill
              className="object-contain"
              style={{ filter: 'invert(1)', transform: 'scale(1.1)' }}
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="navbar__desktop-links">
            {navLinks.map((link) => (
              link.href === '#team' ? (
                <button 
                  key={link.href} 
                  onClick={() => window.dispatchEvent(new Event('openTeamModal'))}
                  className="navbar__link bg-transparent border-none cursor-pointer uppercase tracking-widest font-bold text-[0.625rem]"
                >
                  {link.label}
                </button>
              ) : (
                <Link key={link.href} href={link.href} className="navbar__link">
                  {link.label}
                </Link>
              )
            ))}
            <button onClick={() => window.dispatchEvent(new Event('openContactModal'))} className="btn-primary navbar__cta">
              Hablemos
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="navbar__toggle-icon" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="navbar__toggle-icon" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="navbar__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drop Panel */}
            <motion.div
              className="navbar__dropdown"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="navbar__dropdown-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                  >
                    {link.href === '#team' ? (
                      <button
                        onClick={() => {
                          handleLinkClick();
                          window.dispatchEvent(new Event('openTeamModal'));
                        }}
                        className="navbar__dropdown-link w-full text-left bg-transparent border-none"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="navbar__dropdown-link"
                        onClick={handleLinkClick}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.08, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      handleLinkClick();
                      window.dispatchEvent(new Event('openContactModal'));
                    }}
                    className="btn-primary navbar__dropdown-cta w-full"
                  >
                    Hablemos
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
