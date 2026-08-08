'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Menu, Moon, Shield, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const links = [{ href: '/', label: 'Overview' }, { href: '/video', label: 'Video detector' }, { href: '/image', label: 'Image detector' }];

  useEffect(() => { const saved = window.localStorage.getItem('vidshield-theme'); const isLight = saved === 'light'; setLight(isLight); document.documentElement.classList.toggle('light', isLight); document.documentElement.classList.toggle('dark', !isLight); }, []);
  const toggleTheme = () => { const next = !light; setLight(next); document.documentElement.classList.toggle('light', next); document.documentElement.classList.toggle('dark', !next); window.localStorage.setItem('vidshield-theme', next ? 'light' : 'dark'); };

  return <header className="site-header"><div className="site-header-inner">
    <Link href="/" className="brand"><span className="brand-mark"><Shield /></span><span>vid<span>shield</span></span></Link>
    <nav className="desktop-nav">{links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>{link.label}</Link>)}</nav>
    <div className="nav-actions"><button className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`}>{light ? <Moon /> : <Sun />}</button><Link href="/video" className="nav-cta">Start scan <ExternalLink /></Link></div>
    <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation">{mobileMenuOpen ? <X /> : <Menu />}</button>
  </div>{mobileMenuOpen && <div className="mobile-nav">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={pathname === link.href ? 'active' : ''}>{link.label}</Link>)}<Link href="/video" onClick={() => setMobileMenuOpen(false)} className="nav-cta">Start scan <ExternalLink /></Link></div>}</header>;
}
