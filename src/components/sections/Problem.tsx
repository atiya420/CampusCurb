import { Reveal } from '@/components/Reveal';
import { AlertTriangle, TrendingDown, Frown, DollarSign, Calendar, CloudRain } from 'lucide-react';

export function Problem() {
  return (
    <section id="problem" className="py-20 lg:py-28 bg-peach-100 border-t border-border-peach">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
              THE PROBLEM STATEMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight mb-6">
              College Canteens Prepare Food on Rough Estimates
            </h2>
            <div className="bg-peach-50 border border-border-peach rounded-3xl p-6 lg:p-8 text-left shadow-sm relative">
              <div className="w-2 h-full bg-accent absolute left-0 top-0 rounded-l-3xl" />
              <p className="text-base text-ink leading-relaxed font-medium mb-4">
                College canteens often prepare food based on rough estimates or previous experience rather than actual demand. Student attendance, weather, exams, events, and changing food preferences can cause significant variations in daily consumption.
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                As a result, <strong className="text-accent font-semibold">preparing too much food leads to unnecessary food waste and financial loss</strong>, while <strong className="text-accent font-semibold">preparing too little causes shortages and dissatisfaction</strong>.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-peach-50 border border-border-peach rounded-2xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-sm mb-1">Uncertain Schedules</h3>
              <p className="text-xs text-ink-muted">Exams, holidays, and campus events disrupt daily routine eating patterns.</p>
            </div>

            <div className="bg-peach-50 border border-border-peach rounded-2xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <CloudRain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-sm mb-1">Weather Swings</h3>
              <p className="text-xs text-ink-muted">Rainstorms and extreme temperatures alter dining hall footfall suddenly.</p>
            </div>

            <div className="bg-peach-50 border border-border-peach rounded-2xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-sm mb-1">Financial Waste</h3>
              <p className="text-xs text-ink-muted">Cooking too much food creates raw ingredient losses and kitchen budget waste.</p>
            </div>

            <div className="bg-peach-50 border border-border-peach rounded-2xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <Frown className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-sm mb-1">Food Shortages</h3>
              <p className="text-xs text-ink-muted">Cooking too little leads to unserved hungry students and missed sales.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
