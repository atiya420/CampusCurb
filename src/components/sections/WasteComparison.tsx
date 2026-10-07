import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Leaf, DollarSign, TrendingDown, ShieldAlert, Sparkles } from 'lucide-react';

export function WasteComparison() {
  const [dailyMeals, setDailyMeals] = useState<number>(500);

  // Without CampusCurbs: 18.5% waste
  const wasteWithout = Math.round(dailyMeals * 0.185);
  const soldWithout = dailyMeals - wasteWithout;
  const yearlyCostWithout = wasteWithout * 110 * 300; // 300 academic days

  // With CampusCurbs: 3.8% waste
  const prepWith = Math.round(dailyMeals * 0.86); // optimized prep!
  const wasteWith = Math.round(prepWith * 0.038);
  const soldWith = Math.min(soldWithout, prepWith - wasteWith);
  const yearlyCostWith = wasteWith * 110 * 300;

  const yearlyMoneySaved = yearlyCostWithout - yearlyCostWith;
  const yearlyMealsSaved = (wasteWithout - wasteWith) * 300;
  const yearlyCo2SavedKg = Math.round(yearlyMealsSaved * 0.85);

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-peach-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
              INTERACTIVE WASTE CALCULATOR
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight mb-4">
              Simulate Waste Reduction for Any Campus Size
            </h2>
            <p className="text-base text-ink-muted">
              Slide to adjust daily meal volume and calculate estimated annual food, carbon, and financial savings.
            </p>
          </div>
        </Reveal>

        {/* Interactive Slider */}
        <Reveal delay={100}>
          <div className="bg-peach-50 border border-border-peach rounded-3xl p-6 lg:p-8 mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <label className="text-sm font-bold text-ink uppercase tracking-wider block">
                  Daily Meals Prepared Across Campus
                </label>
                <span className="text-xs text-ink-muted">Adjust total student dining capacity</span>
              </div>
              <div className="bg-white border border-border-peach px-4 py-2 rounded-xl text-center">
                <span className="text-2xl font-black text-accent">{dailyMeals}</span>
                <span className="text-xs font-semibold text-ink-muted ml-1">meals / day</span>
              </div>
            </div>

            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={dailyMeals}
              onChange={(e) => setDailyMeals(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </Reveal>

        {/* Comparison Columns */}
        <Reveal delay={150}>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Column 1: Traditional Fixed Cooking */}
            <div className="bg-peach-50 border border-accent/20 rounded-3xl p-7 lg:p-8 shadow-sm relative">
              <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-6 bg-accent/10 px-3 py-1 rounded-full w-fit">
                TRADITIONAL FIXED COOKING
              </span>

              <div className="space-y-5 text-ink">
                <div>
                  <span className="text-xs text-ink-muted block">Daily Food Prepared</span>
                  <span className="text-3xl font-extrabold">{dailyMeals} plates</span>
                </div>
                <div>
                  <span className="text-xs text-ink-muted block">Average Sold</span>
                  <span className="text-2xl font-bold">{soldWithout} plates</span>
                </div>
                <div>
                  <span className="text-xs text-ink-muted block">Daily Leftover Waste</span>
                  <span className="text-3xl font-black text-accent">{wasteWithout} plates (18.5%)</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border-peach">
                <div className="flex justify-between text-xs text-ink-muted mb-2 font-medium">
                  <span>Waste Ratio</span>
                  <span className="text-accent font-bold">18.5% Waste Rate</span>
                </div>
                <div className="h-2.5 bg-peach-200 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '18.5%' }} />
                </div>
              </div>
            </div>

            {/* Column 2: AI-Powered CampusCurbs */}
            <div className="bg-white border-2 border-green-soft/40 rounded-3xl p-7 lg:p-8 shadow-lg relative">
              <span className="text-xs font-bold text-green-soft tracking-eyebrow uppercase block mb-6 bg-green-soft/10 px-3 py-1 rounded-full w-fit">
                WITH CAMPUSCURBS AI
              </span>

              <div className="space-y-5 text-ink">
                <div>
                  <span className="text-xs text-ink-muted block">Optimized Daily Prep</span>
                  <span className="text-3xl font-extrabold">{prepWith} plates</span>
                </div>
                <div>
                  <span className="text-xs text-ink-muted block">Average Sold</span>
                  <span className="text-2xl font-bold">{soldWith} plates</span>
                </div>
                <div>
                  <span className="text-xs text-ink-muted block">Daily Leftover Waste</span>
                  <span className="text-3xl font-black text-green-soft">{wasteWith} plates (3.8%)</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border-peach">
                <div className="flex justify-between text-xs text-ink-muted mb-2 font-medium">
                  <span>Waste Ratio</span>
                  <span className="text-green-soft font-bold">3.8% Waste Rate</span>
                </div>
                <div className="h-2.5 bg-peach-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-soft rounded-full" style={{ width: '3.8%' }} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Annual Impact Summary Bar */}
        <Reveal delay={200}>
          <div className="bg-ink text-white rounded-3xl p-8 shadow-xl grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-xs font-semibold text-accent-light uppercase tracking-wider block mb-1">
                ANNUAL MONEY SAVED
              </span>
              <span className="text-3xl lg:text-4xl font-extrabold text-white">
                ₹{yearlyMoneySaved.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-green-soft uppercase tracking-wider block mb-1">
                MEALS PREVENTED FROM WASTE
              </span>
              <span className="text-3xl lg:text-4xl font-extrabold text-white">
                {yearlyMealsSaved.toLocaleString()} meals
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-accent-light uppercase tracking-wider block mb-1">
                CO₂ EMISSIONS PREVENTED
              </span>
              <span className="text-3xl lg:text-4xl font-extrabold text-white">
                {yearlyCo2SavedKg.toLocaleString()} kg
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
