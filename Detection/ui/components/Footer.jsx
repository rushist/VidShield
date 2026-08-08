export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060d17]/50 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#74e3d2] animate-pulse" />
          <span className="text-slate-300 font-semibold tracking-wider uppercase">VIDSHIELD / DEEPFAKE INTELLIGENCE</span>
        </div>
        <p className="max-w-md text-center md:text-right text-slate-400 leading-relaxed">
          Model predictions are statistical assistive signals designed for forensics research, not absolute legal proof of identity or authenticity.
        </p>
      </div>
    </footer>
  );
}
