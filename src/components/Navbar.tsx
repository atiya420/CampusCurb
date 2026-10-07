import { useEffect, useState } from 'react';
import { Utensils, ArrowRight } from 'lucide-react';

export type AppView = 'landing' | 'predict' | 'dashboard' | 'dataset' | 'calculator' | 'model';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView, targetSection?: string) => void;
}

const navLinks: { label: string; view: AppView; section?: string }[] = [
  { label: 'Home', view: 'landing' },
  { label: 'Predict & Analytics', view: 'predict', section: 'predict' },
  { label: 'Dataset Logs', view: 'dataset' },
  { label: 'Waste Calculator', view: 'calculator' },
  { label: 'ML Model', view: 'model' },
];

export function Navbar({ activeView, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || activeView !== 'landing'
          ? 'bg-peach-100/95 backdrop-blur-md border-b border-border-peach/80 shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-ink font-bold text-xl tracking-tight group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white shadow-md shadow-accent/20 group-hover:scale-105 transition-transform">
            <Utensils className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="leading-none text-ink font-extrabold text-lg">
              Campus<span className="text-accent">Curbs</span>
            </span>
            <span className="text-[10px] text-ink-muted font-semibold tracking-wider">
              DEMAND & WASTE INTELLIGENCE
            </span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeView === link.view || (link.view === 'predict' && (activeView === 'predict' || activeView === 'dashboard'));
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.view, link.section)}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-accent border-b-2 border-accent pb-0.5'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('predict', 'predict')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-full px-5 py-2.5 shadow-sm hover:shadow transition-all duration-200"
          >
            Predict & Analytics
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
