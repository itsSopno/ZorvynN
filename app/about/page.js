'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', emoji: '👨‍💻' },
  { name: 'Sarah Kim', role: 'Lead Designer', emoji: '🎨' },
  { name: 'James Patel', role: 'Backend Engineer', emoji: '⚙️' },
];

const techStack = [
  { name: 'Next.js 15', color: 'from-white to-gray-400' },
  { name: 'React 19', color: 'from-cyan-400 to-blue-500' },
  { name: 'Tailwind CSS', color: 'from-teal-400 to-cyan-500' },
  { name: 'GSAP', color: 'from-green-400 to-emerald-500' },
  { name: 'Next.js API Routes', color: 'from-purple-400 to-violet-600' },
];

export default function AboutPage() {
  const headerRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo(
      '.about-card',
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.team-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: { trigger: '.team-section', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.tech-badge',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.tech-section', start: 'top 85%' },
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About <span className="gradient-text">Zorvyn</span>
          </h1>
          <p className="text-[#8892b0] text-xl max-w-2xl mx-auto leading-relaxed">
            We're building next-generation tools that empower developers to ship
            faster, better, and with more confidence.
          </p>
        </div>

        {/* Mission Cards */}
        <div ref={missionRef} className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: '🚀',
              title: 'Our Mission',
              desc: 'To make full-stack development feel like magic—by unifying frontend beauty with backend power inside a single Next.js project.',
            },
            {
              icon: '🌍',
              title: 'Our Vision',
              desc: 'A world where developers can move from idea to production in hours, not weeks, without sacrificing quality or scalability.',
            },
          ].map((item, i) => (
            <div key={i} className="about-card glass-card p-8 hover:border-[#6c63ff]/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
              <p className="text-[#8892b0] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="tech-section mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Powered by <span className="gradient-text">the best</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((t, i) => (
              <div
                key={i}
                className={`tech-badge px-6 py-3 rounded-full bg-gradient-to-r ${t.color} font-semibold text-sm text-white shadow-lg cursor-default hover:scale-105 transition-transform`}
              >
                {t.name}
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="team-section">
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="team-card glass-card p-8 text-center hover:border-[#6c63ff]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#8892b0] text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
