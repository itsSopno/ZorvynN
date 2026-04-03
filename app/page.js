'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Built on Next.js App Router with server components and edge rendering for maximum performance.',
  },
  {
    icon: '🎨',
    title: 'Beautiful UI',
    desc: 'Crafted with Tailwind CSS and GSAP animations for a stunning, interactive experience.',
  },
  {
    icon: '🔗',
    title: 'Full-Stack Ready',
    desc: 'API routes built right inside Next.js — no separate backend server needed.',
  },
  {
    icon: '🛡️',
    title: 'Type-Safe Routes',
    desc: 'Next.js App Router with file-based routing keeps navigation clean and predictable.',
  },
];

const stats = [
  { value: '99%', label: 'Uptime' },
  { value: '< 1ms', label: 'API Latency' },
  { value: '10K+', label: 'Users' },
  { value: '50+', label: 'Integrations' },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Orb float animation
    gsap.to(orbRef1.current, {
      y: -30,
      x: 20,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to(orbRef2.current, {
      y: 25,
      x: -15,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });

    // Hero entrance
    tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');

    // Stats scroll-trigger
    gsap.fromTo(
      '.stat-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      }
    );

    // Feature cards scroll-trigger
    gsap.fromTo(
      '.feature-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-grid">
      {/* Orbs */}
      <div ref={orbRef1} className="orb w-[500px] h-[500px] bg-[#6c63ff] top-[-100px] left-[-100px]" />
      <div ref={orbRef2} className="orb w-[400px] h-[400px] bg-[#06b6d4] bottom-[10%] right-[-80px]" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6c63ff]/10 border border-[#6c63ff]/20 text-[#a78bfa] text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
          Now with Next.js 15 App Router
        </div>

        <h1 ref={titleRef} className="text-6xl md:text-8xl font-black leading-tight mb-6 max-w-5xl">
          Build the Future with{' '}
          <span className="gradient-text">Zorvyn</span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-[#8892b0] max-w-2xl mb-10 leading-relaxed">
          A blazing-fast, full-stack Next.js platform powered by GSAP animations,
          Tailwind CSS, and built-in API routes.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <Link href="/products" className="glow-btn px-8 py-4 text-base">
            Explore Products →
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 text-base rounded-xl border border-white/10 text-[#8892b0] hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 font-medium"
          >
            Learn More
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8892b0] text-xs">
          <span>Scroll down</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#8892b0] to-transparent animate-pulse" />
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="stat-item glass-card p-6 text-center group hover:border-[#6c63ff]/30 transition-all duration-300">
              <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
              <div className="text-[#8892b0] text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you <span className="gradient-text">need</span>
            </h2>
            <p className="text-[#8892b0] text-lg max-w-xl mx-auto">
              A complete toolkit for building modern, performant web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card glass-card p-8 group hover:border-[#6c63ff]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">{f.title}</h3>
                <p className="text-[#8892b0] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center border-[#6c63ff]/20">
          <h2 className="text-4xl font-bold mb-4">
            Ready to <span className="gradient-text">get started?</span>
          </h2>
          <p className="text-[#8892b0] mb-8 text-lg">
            Jump in and explore Zorvyn's full-stack capabilities.
          </p>
          <Link href="/products" className="glow-btn px-10 py-4 text-base inline-block">
            View Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
