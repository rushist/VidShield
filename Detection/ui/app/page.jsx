'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Video, Image as ImageIcon, ArrowRight, Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="pt-12 pb-6 max-w-4xl space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-[#74e3d2] text-xs font-mono tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#74e3d2] animate-pulse" />
          Authenticity Intelligence
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]"
        >
          Know what’s real <br />
          <em className="not-italic font-normal text-[#a9dcff]">before it travels.</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-normal"
        >
          VidShield analyzes subtle visual and temporal anomalies that synthetic media leaves behind. Select a specialized detector to inspect your evidence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Link
            href="/video"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#74e3d2] hover:bg-[#85ebd9] text-[#060d17] font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-[0_0_25px_rgba(116,227,210,0.3)] hover:scale-[1.02]"
          >
            Analyze Video <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/image"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-[#74e3d2] border border-teal-500/30 font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02]"
          >
            Inspect Image <ImageIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Detector Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Video Detector Card */}
        <Link href="/video" className="block group">
          <SpotlightCard 
            spotlightColor="rgba(116, 227, 210, 0.2)"
            className="h-full min-h-[340px] flex flex-col justify-between group-hover:border-teal-400/50"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 tracking-wider">
                <span className="text-[#74e3d2] font-semibold">01 / TEMPORAL ANALYSIS</span>
                <Video className="w-5 h-5 text-[#74e3d2] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              {/* Animated Waveform Visualization */}
              <div className="h-20 my-6 flex items-center gap-2">
                {[28, 52, 76, 60, 84, 60, 76, 52, 28].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                    className="w-2 rounded-full bg-gradient-to-t from-[#74e3d2] to-[#a99bff] signal-bar"
                  />
                ))}
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-[#74e3d2] transition-colors">
                Video Detector
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Detect frame-to-frame temporal inconsistencies and motion synthesis artifacts with Video Swin Transformer.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 font-mono text-xs text-slate-500 flex items-center justify-between">
              <span>MP4 · MOV · WEBM</span>
              <span className="text-[#74e3d2] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Launch <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </SpotlightCard>
        </Link>

        {/* Image Detector Card */}
        <Link href="/image" className="block group">
          <SpotlightCard 
            spotlightColor="rgba(169, 155, 255, 0.2)"
            className="h-full min-h-[340px] flex flex-col justify-between group-hover:border-purple-400/50"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 tracking-wider">
                <span className="text-[#a99bff] font-semibold">02 / SPATIAL ANALYSIS</span>
                <ImageIcon className="w-5 h-5 text-[#a99bff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              {/* Animated Pixel Matrix Grid */}
              <div className="h-20 my-6 grid grid-cols-4 gap-2 w-32 items-center">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm transition-opacity duration-500 ${
                      i % 3 === 0
                        ? 'bg-[#74e3d2] opacity-90'
                        : i % 2 === 0
                        ? 'bg-[#a99bff] opacity-70'
                        : 'bg-purple-500/30 opacity-40'
                    }`}
                  />
                ))}
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-[#a99bff] transition-colors">
                Image Detector
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Inspect high-resolution visual details and spatial noise patterns for synthesized elements using ConvNeXt Tiny.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 font-mono text-xs text-slate-500 flex items-center justify-between">
              <span>JPG · PNG · WEBP</span>
              <span className="text-[#a99bff] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Launch <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </SpotlightCard>
        </Link>
      </section>

      {/* Signal Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="text-3xl md:text-4xl font-mono font-bold text-[#74e3d2]">2</div>
          <p className="text-xs uppercase font-mono tracking-wider text-slate-400">Specialized Models</p>
        </div>
        <div className="space-y-1 border-l border-slate-800/80 pl-6">
          <div className="text-3xl md:text-4xl font-mono font-bold text-white">16</div>
          <p className="text-xs uppercase font-mono tracking-wider text-slate-400">Frames per Video Clip</p>
        </div>
        <div className="space-y-1 border-l border-slate-800/80 pl-6">
          <div className="text-3xl md:text-4xl font-mono font-bold text-white">224<span className="text-sm font-normal text-slate-500">px</span></div>
          <p className="text-xs uppercase font-mono tracking-wider text-slate-400">Analysis Resolution</p>
        </div>
        <div className="space-y-1 border-l border-slate-800/80 pl-6">
          <div className="text-3xl md:text-4xl font-mono font-bold text-[#a99bff]">API</div>
          <p className="text-xs uppercase font-mono tracking-wider text-slate-400">Live Inference</p>
        </div>
      </section>

      {/* Info Breakdown Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#74e3d2]">Designed for Evidence</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            One question.<br />Two ways to investigate.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            VidShield combines spatial frame analysis with sequence-level temporal evaluation to ensure high fidelity across media types.
          </p>
        </div>

        <div className="md:col-span-7 space-y-8">
          <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 text-[#74e3d2] font-mono text-xs font-semibold">
              <Activity className="w-4 h-4" /> VIDEO SWIN SMALL
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reads short clips as temporal sequences, catching subtle motion jitter, lighting skips, and flicker errors that single frames miss.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 text-[#a99bff] font-mono text-xs font-semibold">
              <Cpu className="w-4 h-4" /> CONVNEXT TINY
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Examines individual image frames for spatial artifacts, abnormal frequency noise distributions, and boundary blurring.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> PRIVACY & INTEGRITY
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Uploaded files are held in temporary memory during request processing and are never permanently stored or shared.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
