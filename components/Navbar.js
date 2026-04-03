'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/users', label: 'Users' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
      logoRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' }
    );

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050816]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" ref={logoRef} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#06b6d4] flex items-center justify-center text-sm font-black shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-200">
            Z
          </div>
          <span className="text-xl font-bold gradient-text">Zorvyn</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'bg-[#6c63ff]/20 text-[#a78bfa] border border-[#6c63ff]/30'
                    : 'text-[#8892b0] hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/products"
            className="glow-btn px-5 py-2 text-sm"
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 glass-card p-4 mx-0">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all ${
                pathname === href
                  ? 'bg-[#6c63ff]/20 text-[#a78bfa]'
                  : 'text-[#8892b0] hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
