import { Reveal } from '@/components/Reveal';
import { Database, Cpu, TrendingUp, Sparkles, CheckCircle2, BarChart2 } from 'lucide-react';

const featureImportances = [
  { name: 'Expected Campus Footfall', pct: 38, color: 'bg-accent' },
  { name: 'Academic Schedule & Exams', pct: 24, color: 'bg-accent-light' },
  { name: 'Weather Condition & Temp', pct: 18, color: 'bg-green-soft' },
  { name: 'Historical Item Sales Trend', pct: 14, color: 'bg-ink' },
  { name: 'Day of Week & Outlet Location', pct: 6, color: 'bg-ink-muted' },
];

export function Model() {
  return (
    <section id="model" className="py-20 lg:py-28 bg-peach-300/40 border-t border-border-peach">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
              MACHINE LEARNING ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight mb-4">
              Behind the CampusCurbs AI Engine
            </h2>
            <p className="text-base text-ink-muted">
              Combining Random Forest Regressor & XGBoost ensemble models trained on historical campus dining data.
            </p>
          </div>
        </Reveal>

        {/* 3-Step Pipeline Flow */}
        <Reveal delay={100}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-peach-50 border border-border-peach rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-base mb-2">1. Data Ingestion</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Collects student timetable data, exam calendars, weather forecasts, and historical POS canteen logs.
              </p>
            </div>

            <div className="bg-peach-50 border border-border-peach rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-base mb-2">2. ML Feature Engineering</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Applies Random Forest ensemble regression with safety buffer margins and weather decay multipliers.
              </p>
            </div>

            <div className="bg-peach-50 border border-border-peach rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-soft/10 border border-green-soft/30 flex items-center justify-center text-green-soft mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-base mb-2">3. Kitchen Dispatch</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Outputs precise plate preparation counts, safety buffers, financial forecasts, and printable kitchen tickets.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Feature Importance & Model Metrics Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Feature Importances */}
          <div className="lg:col-span-7 bg-peach-50 border border-border-peach rounded-3xl p-7 shadow-sm">
            <h3 className="text-xl font-bold text-ink mb-1">Feature Importance Weighting</h3>
            <p className="text-xs text-ink-muted mb-6">Relative contribution of each campus signal to the final prediction.</p>

            <div className="space-y-4">
              {featureImportances.map((f) => (
                <div key={f.name}>
                  <div className="flex justify-between text-xs font-semibold text-ink mb-1.5">
                    <span>{f.name}</span>
                    <span className="font-mono text-accent">{f.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-peach-200 rounded-full overflow-hidden">
                    <div className={`h-full ${f.color} rounded-full transition-all duration-700`} style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Card Metrics */}
          <div className="lg:col-span-5 bg-peach-50 border border-border-peach rounded-3xl p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-ink mb-1">Model Performance Card</h3>
              <p className="text-xs text-ink-muted mb-6">Cross-validated evaluation benchmarks.</p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border-peach/60">
                  <span className="font-sans text-ink-muted">Algorithm</span>
                  <span className="font-bold text-ink font-sans">Random Forest Regressor</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border-peach/60">
                  <span className="font-sans text-ink-muted">R² Accuracy Score</span>
                  <span className="font-bold text-green-soft font-mono text-sm">0.946</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border-peach/60">
                  <span className="font-sans text-ink-muted">RMSE (Root Mean Sq. Error)</span>
                  <span className="font-bold text-ink font-mono">4.8 plates</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border-peach/60">
                  <span className="font-sans text-ink-muted">MAE (Mean Abs. Error)</span>
                  <span className="font-bold text-ink font-mono">3.2 plates</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-peach text-center">
              <span className="text-[11px] font-semibold text-ink-muted">
                Python · Scikit-Learn · Pandas · React · Vite
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
