import { Reveal } from '@/components/Reveal';
import { Sparkles, Utensils, CheckCircle2, ShieldCheck, ArrowRight, Brain, Database, TrendingUp } from 'lucide-react';

export function Solution() {
  return (
    <section id="solution" className="py-20 lg:py-28 bg-peach-50 border-t border-border-peach">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
              THE PROPOSED SOLUTION
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight mb-4">
              CampusCurbs: Data-Driven Demand Prediction
            </h2>
            <p className="text-lg text-ink font-semibold bg-peach-200/70 border border-border-peach rounded-2xl p-4 max-w-2xl mx-auto text-accent">
              "CampusCurbs uses machine learning to predict daily food demand, helping college canteens prepare the right amount of food while reducing waste and unnecessary costs."
            </p>
          </div>
        </Reveal>

        {/* Detailed Solution Explanation Card + Concrete Biryani Example */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="space-y-4 text-base text-ink leading-relaxed">
                <p>
                  <strong>CampusCurbs</strong> is a machine-learning-based food demand prediction system that analyzes historical canteen data along with key factors such as <strong>student attendance, weather, academic schedules, food items, and previous sales</strong>.
                </p>
                <p className="text-sm text-ink-muted">
                  The system predicts the expected quantity of each food item for the following day and provides a recommended preparation quantity with a small safety buffer.
                </p>
                
                <div className="pt-2 space-y-2 text-xs font-semibold text-ink">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-soft shrink-0" />
                    <span>Reduces unnecessary kitchen leftovers and food waste</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-soft shrink-0" />
                    <span>Controls procurement and ingredient costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-soft shrink-0" />
                    <span>Improves food availability & student satisfaction</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Solution Concrete Example Card */}
          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <div className="bg-peach-100/80 border-2 border-accent/30 rounded-3xl p-7 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-border-peach pb-3 mb-4">
                  <span className="text-xs font-bold text-accent tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    REAL SOLUTION EXAMPLE
                  </span>
                  <span className="text-[10px] font-bold bg-accent text-white px-2 py-0.5 rounded-full">
                    TOMORROW'S PREP
                  </span>
                </div>

                <div className="bg-white border border-border-peach rounded-2xl p-5 space-y-4 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                      TARGET FOOD ITEM
                    </span>
                    <h4 className="text-2xl font-black text-ink">Tomorrow's Biryani</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-peach/60 text-xs">
                    <div className="bg-peach-50 p-3 rounded-xl">
                      <span className="text-ink-muted block text-[11px]">PREDICTED DEMAND</span>
                      <span className="text-2xl font-black text-ink">145</span>
                      <span className="text-[11px] text-ink-muted block">plates</span>
                    </div>

                    <div className="bg-accent/10 border border-accent/30 p-3 rounded-xl">
                      <span className="text-accent font-bold block text-[11px]">RECOMMENDED PREP</span>
                      <span className="text-2xl font-black text-accent">150</span>
                      <span className="text-[11px] text-accent font-semibold block">+5 safety buffer</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-ink-muted text-center mt-4 font-medium">
                  Result: Zero stockouts, minimal leftover waste!
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 4 Steps Feature Icons */}
        <Reveal delay={200}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            <div className="bg-white border border-border-peach rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-ink text-sm mb-1">1. Historical Canteen Data</h4>
              <p className="text-xs text-ink-muted">Past sales, consumption trends & menu history</p>
            </div>

            <div className="bg-white border border-border-peach rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-ink text-sm mb-1">2. ML Demand Factors</h4>
              <p className="text-xs text-ink-muted">Student attendance, weather & exam schedules</p>
            </div>

            <div className="bg-white border border-border-peach rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-ink text-sm mb-1">3. Next-Day Prediction</h4>
              <p className="text-xs text-ink-muted">Expected quantity per item (e.g., 145 Biryani)</p>
            </div>

            <div className="bg-white border border-border-peach rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-soft/15 text-green-soft flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-ink text-sm mb-1">4. Optimized Prep & Buffer</h4>
              <p className="text-xs text-ink-muted">Decide exact kitchen cooking (e.g., 150 plates)</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
