'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, ExternalLink, Menu, X, Video, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/video', label: 'Video Detector', icon: Video },
    { href: '/image', label: 'Image Detector', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060d17]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-teal-500/10 border border-teal-400/40 transform group-hover:rotate-6 transition-transform duration-300">
            <Shield className="w-5 h-5 text-[#74e3d2]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#74e3d2] transition-colors">
            vid<span className="text-[#74e3d2]">shield</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-[#74e3d2]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#74e3d2] shadow-[0_0_8px_#74e3d2] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/video"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#74e3d2] hover:bg-[#85ebd9] text-[#060d17] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(116,227,210,0.25)] hover:shadow-[0_0_25px_rgba(116,227,210,0.4)] hover:-translate-y-0.5"
          >
            Start Scan <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#060d17]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-teal-500/10 text-[#74e3d2] border border-teal-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/video"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#74e3d2] text-[#060d17] font-bold text-xs uppercase tracking-wider mt-4"
          >
            Start Scan <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
