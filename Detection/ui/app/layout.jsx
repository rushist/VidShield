import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'VidShield — Evidence deserves better answers',
  description: 'Focused video and image analysis for detecting synthetic media.',
};

export default function RootLayout({ children }) {
  return <html lang="en" className="dark"><body><Navbar /><main className="page-shell">{children}</main><Footer /></body></html>;
}
