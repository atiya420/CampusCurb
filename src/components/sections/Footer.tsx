import { Utensils } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Predict', href: '#predict' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Dataset', href: '#dataset' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'ML Model', href: '#model' },
];

export function Footer() {
  return (
    <footer className="border-t border-border-peach py-12 bg-peach-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <a href="#home" className="flex items-center gap-2 text-ink font-bold text-xl mb-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white">
                <Utensils className="w-4 h-4" strokeWidth={2.5} />
              </div>
              Campus<span className="text-accent">Curbs</span>
            </a>
            <p className="text-xs text-ink-muted">Smart Campus Demand & Food Waste Intelligence Engine</p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-ink-muted hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-border-peach/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} CampusCurbs. Data Science & Sustainability Project.</p>
        </div>
      </div>
    </footer>
  );
}
