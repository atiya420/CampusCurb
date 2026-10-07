import { Reveal } from '@/components/Reveal';
import { Award, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-peach-50 border-t border-border-peach">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <Reveal>
          <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
            <Award className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
            ABOUT CAMPUSCURBS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight mb-6 max-w-xl mx-auto">
            AI-Driven Demand & Waste Intelligence for Higher Education
          </h2>
          <p className="text-base text-ink-muted leading-relaxed max-w-lg mx-auto mb-10">
            <strong className="text-ink font-semibold">CampusCurbs</strong> was engineered to solve one critical challenge: turning routine university canteen data into actionable daily cooking recommendations that save money and protect our environment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-ink">
            <span className="bg-peach-200 border border-border-peach px-4 py-2 rounded-full">
              Random Forest Regressor
            </span>
            <span className="bg-peach-200 border border-border-peach px-4 py-2 rounded-full">
              94.6% Accuracy
            </span>
            <span className="bg-peach-200 border border-border-peach px-4 py-2 rounded-full">
              Zero-Waste Kitchen Workflow
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
