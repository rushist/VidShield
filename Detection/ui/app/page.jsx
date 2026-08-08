'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Cpu, Image as ImageIcon, ShieldCheck, Video } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import HalftoneReveal from '../components/HalftoneReveal';

const detectors = [
  { href: '/video', number: '01', label: 'TEMPORAL ANALYSIS', title: 'Video Detector', icon: Video, copy: 'Find motion synthesis artifacts, frame jitter, lighting skips, and temporal inconsistencies.', formats: 'MP4 · MOV · WEBM' },
  { href: '/image', number: '02', label: 'SPATIAL ANALYSIS', title: 'Image Detector', icon: ImageIcon, copy: 'Inspect pixel-level noise, boundary softness, and visual patterns left by generated media.', formats: 'JPG · PNG · WEBP' },
];

export default function Home() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <HalftoneReveal />
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow">
            <span className="status-dot" /> Media authenticity infrastructure
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
            Evidence deserves<br /><span>better answers.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }} className="hero-copy">
            VidShield gives you a clear signal when images and video cannot be trusted. Run focused analysis on the media that matters.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="hero-actions">
            <Link href="/video" className="button button-primary">Start analysis <ArrowRight data-icon="inline-end" /></Link>
            <Link href="#detectors" className="text-link">Explore detectors <ArrowRight data-icon="inline-end" /></Link>
          </motion.div>
        </div>
        <div className="hero-meta"><span>VIDSHIELD / 01</span><span>DETECTION SYSTEMS</span><span>SCROLL TO EXPLORE</span></div>
      </section>

      <section id="detectors" className="content-section">
        <div className="section-heading"><div><span className="section-kicker">Choose your signal</span><h2>Two ways to investigate.</h2></div><p>Purpose-built models for the two places synthetic media leaves a trace: time and space.</p></div>
        <div className="detector-grid">
          {detectors.map(({ href, number, label, title, icon: Icon, copy, formats }) => (
            <Link href={href} key={href} className="detector-link">
              <SpotlightCard className="detector-card" spotlightColor="rgba(93, 214, 44, 0.22)">
                <div className="card-top"><span className="card-index">{number} / {label}</span><Icon /></div>
                <div className="signal-visual" aria-hidden="true">{Array.from({ length: 14 }).map((_, index) => <span key={index} style={{ height: `${28 + ((index * 23) % 64)}%` }} />)}</div>
                <h3>{title}</h3><p>{copy}</p>
                <div className="card-footer"><span>{formats}</span><span className="launch">Launch <ArrowRight data-icon="inline-end" /></span></div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="proof-strip"><div><strong>02</strong><span>Specialized models</span></div><div><strong>16</strong><span>Frames per clip</span></div><div><strong>224<span className="unit">px</span></strong><span>Analysis resolution</span></div><div><strong>API</strong><span>Live inference</span></div></section>

      <section className="method-section"><div><span className="section-kicker">Built for clarity</span><h2>A result you can act on.</h2><p>VidShield turns complex model output into a focused investigation workflow. No noise, no theatrics — just a reasoned signal.</p></div><div className="method-list"><div><Activity /><div><h3>Temporal intelligence</h3><p>Sequence-level evaluation catches the inconsistencies a single frame misses.</p></div></div><div><Cpu /><div><h3>Spatial intelligence</h3><p>Pixel-level analysis surfaces abnormal noise distributions and blurred boundaries.</p></div></div><div><ShieldCheck /><div><h3>Private by design</h3><p>Files are held in temporary memory during processing and never permanently stored.</p></div></div></div></section>
    </div>
  );
}
