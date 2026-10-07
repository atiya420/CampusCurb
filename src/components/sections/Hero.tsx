import { ArrowRight, BarChart3, Utensils } from 'lucide-react';

interface HeroProps {
  onNavigatePredict: () => void;
  onNavigateDashboard: () => void;
}

export function Hero({ onNavigatePredict, onNavigateDashboard }: HeroProps) {
  return (
    <section id="home" className="pt-4 pb-16 sm:pt-6 lg:pt-8 lg:pb-24 relative overflow-hidden bg-peach-100">
      {/* Sleek Top-Left Brand Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-start">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-sm">
            <Utensils className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col text-left">
            <span className="leading-none text-ink font-bold text-base tracking-tight">
              Campus<span className="text-accent">Curbs</span>
            </span>
            <span className="text-[9px] text-ink-muted font-bold tracking-wider uppercase mt-0.5">
              DEMAND & WASTE INTELLIGENCE
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-extrabold leading-[1.1] tracking-tight text-ink mb-6">
          Predict Daily Food Demand.
          <br />
          <span className="text-accent">Eliminate Campus Waste.</span>
        </h1>
        
        <p className="text-lg text-ink leading-relaxed max-w-2xl mx-auto mb-4 font-semibold">
          <strong className="text-accent">CampusCurbs</strong> uses machine learning to predict daily food demand, helping college canteens prepare the right amount of food while reducing waste and unnecessary costs.
        </p>

        <p className="text-sm text-ink-muted leading-relaxed max-w-xl mx-auto mb-10">
          Analyzes historical canteen data along with student attendance, weather, academic schedules, food items, and previous sales to output precise preparation recommendations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onNavigatePredict}
            className="inline-flex items-center gap-2.5 bg-accent text-white font-bold text-sm rounded-full px-8 py-4 hover:bg-accent/90 shadow-xl shadow-accent/25 transition-all duration-200 hover:scale-105"
          >
            Predict Demand Now
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={onNavigateDashboard}
            className="inline-flex items-center gap-2 text-ink font-bold text-sm rounded-full px-7 py-4 border border-border-peach hover:border-accent/40 bg-peach-50 hover:bg-white shadow-sm transition-all duration-200 hover:scale-105"
          >
            <BarChart3 className="w-4.5 h-4.5 text-accent" />
            Explore Analytics Dashboard
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border-peach max-w-xl mx-auto">
          <div className="bg-peach-50 border border-border-peach/60 rounded-2xl p-4">
            <span className="text-2xl lg:text-3xl font-black text-ink block">94.6%</span>
            <span className="text-xs text-ink-muted font-medium">Model Accuracy</span>
          </div>
          <div className="bg-peach-50 border border-border-peach/60 rounded-2xl p-4">
            <span className="text-2xl lg:text-3xl font-black text-accent block">₹1,48,500</span>
            <span className="text-xs text-ink-muted font-medium">Money Saved</span>
          </div>
          <div className="bg-peach-50 border border-border-peach/60 rounded-2xl p-4">
            <span className="text-2xl lg:text-3xl font-black text-green-soft block">1,240 kg</span>
            <span className="text-xs text-ink-muted font-medium">Waste Prevented</span>
          </div>
        </div>
      </div>
    </section>
  );
}
