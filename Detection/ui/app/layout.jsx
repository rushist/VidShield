import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'VidShield - Deepfake Detection & Synthetic Media Intelligence',
  description: 'Analyze visual and temporal signals of synthetic media using Video Swin Small and ConvNeXt Tiny models.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#060d17] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-[#74e3d2]/30 selection:text-[#74e3d2]">
        <div className="glow-a" />
        <div className="glow-b" />
        <div className="glow-c" />
        
        <Navbar />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-8 pb-16 relative z-10">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
