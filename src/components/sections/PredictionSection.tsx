import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ChevronDown, Loader2, Printer, Sparkles, Send, DollarSign, Leaf, ShieldAlert, CheckCircle2, Sliders, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { predictDemand } from '@/lib/predict';
import { foodCatalog, campusOutlets } from '@/lib/data';
import { PredictionInput, PredictionResult, KitchenTicket, PresetScenario } from '@/types/campus';
import { useCountUp } from '@/hooks/useCountUp';
import { MiniLineChart } from '@/components/charts/MiniLineChart';

const weatherOptions = ['Sunny', 'Cloudy', 'Rainy', 'Cold', 'Extreme Heat'];
const academicOptions = ['Normal', 'Exam', 'Event', 'Weekend', 'Holiday'];

interface PredictionSectionProps {
  presetScenario: PresetScenario | null;
  onDispatchTicket: (ticket: KitchenTicket) => void;
  onOpenTicketModal: (ticket: KitchenTicket) => void;
}

export function PredictionSection({
  presetScenario,
  onDispatchTicket,
  onOpenTicketModal,
}: PredictionSectionProps) {
  const [outlet, setOutlet] = useState('Main Dining Hall');
  const [food, setFood] = useState('Hyderabadi Biryani');
  const [students, setStudents] = useState<number>(420);
  const [weather, setWeather] = useState<'Sunny' | 'Cloudy' | 'Rainy' | 'Cold' | 'Extreme Heat'>('Sunny');
  const [tempCelsius, setTempCelsius] = useState<number>(27);
  const [academicDay, setAcademicDay] = useState<'Normal' | 'Exam' | 'Holiday' | 'Event' | 'Weekend'>('Normal');
  const [previousSales, setPreviousSales] = useState<number>(150);

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastTicket, setLastTicket] = useState<KitchenTicket | null>(null);

  // Auto run initial prediction on mount
  useEffect(() => {
    runPrediction({
      outlet,
      food,
      students,
      weather,
      tempCelsius,
      academicDay,
      previousSales,
      dayOfWeek: 'Today',
    });
  }, []);

  const runPrediction = (input: PredictionInput) => {
    setLoading(true);
    setTimeout(() => {
      const res = predictDemand(input);
      setResult(res);
      setLoading(false);
    }, 400);
  };

  const handlePredict = () => {
    runPrediction({
      outlet,
      food,
      students: Number(students) || 0,
      weather,
      tempCelsius: Number(tempCelsius) || 25,
      academicDay,
      previousSales: Number(previousSales) || 0,
      dayOfWeek: 'Today',
    });
  };

  const handleCreateKitchenTicket = () => {
    if (!result) return;
    const ticket: KitchenTicket = {
      ticketId: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      outlet,
      item: food,
      recommendedPrep: result.recommendedPrep,
      predictedDemand: result.predictedDemand,
      buffer: result.buffer,
      expectedStudents: Number(students),
      weather,
      academicDay,
      status: 'Queued',
    };
    setLastTicket(ticket);
    onDispatchTicket(ticket);
    onOpenTicketModal(ticket);
  };

  const animatedPrep = useCountUp(result?.recommendedPrep ?? 0, 800, true);

  // Dynamic 7-day forecast trend data based on prediction input
  const dynamicTrend = useMemo(() => {
    if (!result) return [130, 135, 140, 125, 145, 140, 150];
    const base = result.predictedDemand;
    return [
      Math.round(base * 0.91),
      Math.round(base * 0.96),
      Math.round(base * 1.06),
      Math.round(base * 0.86),
      Math.round(base * 1.03),
      Math.round(base * 0.98),
      base,
    ];
  }, [result]);

  return (
    <section id="predict" className="py-20 lg:py-28 bg-peach-300/60 border-t border-border-peach">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-2">
              LIVE ML PREDICTION ENGINE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight mb-4">
              What Should the Campus Kitchen Prepare?
            </h2>
            <p className="text-base text-ink-muted">
              Adjust campus conditions below to run real-time Random Forest demand inference. Graphs and charts update dynamically.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Input Controls Panel */}
          <div className="lg:col-span-6 bg-peach-50 border border-border-peach rounded-3xl p-7 lg:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-border-peach/60 pb-4 mb-6">
              <h3 className="font-bold text-ink text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-accent" />
                Campus Parameters
              </h3>
              <span className="text-xs font-semibold text-green-soft bg-green-soft/10 px-2.5 py-0.5 rounded-full">
                Live Dynamic Engine
              </span>
            </div>

            <div className="space-y-5">
              {/* Outlet Selector */}
              <div>
                <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                  Canteen Outlet Location
                </label>
                <div className="relative">
                  <select
                    value={outlet}
                    onChange={(e) => setOutlet(e.target.value)}
                    className="w-full bg-white border border-border-peach rounded-xl px-4 py-3 text-sm font-semibold text-ink appearance-none cursor-pointer hover:border-accent/40 focus:border-accent focus:outline-none transition-colors"
                  >
                    {campusOutlets.map((o) => (
                      <option key={o.id} value={o.name}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                </div>
              </div>

              {/* Food Item Selector */}
              <div>
                <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                  Target Food Item
                </label>
                <div className="relative">
                  <select
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    className="w-full bg-white border border-border-peach rounded-xl px-4 py-3 text-sm font-semibold text-ink appearance-none cursor-pointer hover:border-accent/40 focus:border-accent focus:outline-none transition-colors"
                  >
                    {foodCatalog.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} ({item.category} · ₹{item.basePrice})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                </div>
              </div>

              {/* Attendance Slider / Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                    Expected Campus Footfall
                  </label>
                  <span className="text-xs font-bold text-accent">{students} Students</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="700"
                  step="10"
                  value={students}
                  onChange={(e) => setStudents(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
              </div>

              {/* Weather & Temperature Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    Weather Condition
                  </label>
                  <div className="relative">
                    <select
                      value={weather}
                      onChange={(e) => setWeather(e.target.value as any)}
                      className="w-full bg-white border border-border-peach rounded-xl px-3 py-2.5 text-xs font-semibold text-ink appearance-none cursor-pointer"
                    >
                      {weatherOptions.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">Temp (°C)</label>
                    <span className="text-xs font-semibold text-ink">{tempCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="42"
                    value={tempCelsius}
                    onChange={(e) => setTempCelsius(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer mt-2"
                  />
                </div>
              </div>

              {/* Academic Schedule & Previous Sales Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    Academic Day Type
                  </label>
                  <div className="relative">
                    <select
                      value={academicDay}
                      onChange={(e) => setAcademicDay(e.target.value as any)}
                      className="w-full bg-white border border-border-peach rounded-xl px-3 py-2.5 text-xs font-semibold text-ink appearance-none cursor-pointer"
                    >
                      {academicOptions.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                    Prev. Day Sales
                  </label>
                  <input
                    type="number"
                    value={previousSales}
                    onChange={(e) => setPreviousSales(Number(e.target.value))}
                    placeholder="e.g. 150"
                    className="w-full bg-white border border-border-peach rounded-xl px-3 py-2.5 text-xs font-semibold text-ink"
                  />
                </div>
              </div>

              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-accent text-white font-bold text-sm rounded-2xl py-3.5 hover:bg-accent/90 shadow-md shadow-accent/20 transition-all duration-200 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calculating ML Inference...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Predict Kitchen Preparation
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Visualization Panel */}
          <div className="lg:col-span-6">
            {result ? (
              <div className="bg-peach-50 border border-border-peach rounded-3xl p-7 lg:p-8 shadow-md transition-all duration-300">
                <div className="flex items-center justify-between border-b border-border-peach/60 pb-4 mb-6">
                  <div>
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">PREDICTION RESULT</span>
                    <h4 className="font-extrabold text-ink text-lg">{food}</h4>
                  </div>
                  <span className="text-xs font-bold text-green-soft bg-green-soft/10 px-3 py-1 rounded-full border border-green-soft/20">
                    Confidence: {result.confidence}%
                  </span>
                </div>

                {/* Big Number Display */}
                <div className="bg-white border border-border-peach/80 rounded-2xl p-6 mb-6 shadow-sm">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-1">
                    RECOMMENDED KITCHEN PREP
                  </span>
                  <div className="flex items-end justify-between">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl lg:text-6xl font-black text-ink leading-none">
                        {animatedPrep}
                      </span>
                      <span className="text-sm font-semibold text-ink-muted mb-1.5">plates</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-ink-muted block">Base Demand</span>
                      <span className="text-lg font-bold text-ink">{result.predictedDemand}</span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-ink-muted font-medium mb-1.5">
                      <span>Predicted ({result.predictedDemand})</span>
                      <span className="text-accent font-bold">+ Buffer ({result.buffer})</span>
                    </div>
                    <div className="h-2.5 bg-peach-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (result.predictedDemand / result.recommendedPrep) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic 7-day trend chart reflecting input changes */}
                <div className="bg-white border border-border-peach/80 rounded-2xl p-4 mb-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-accent" />
                      Dynamic 7-Day Demand Forecast ({food})
                    </span>
                    <span className="text-xs font-bold text-accent font-mono">Peak: {Math.max(...dynamicTrend)} plates</span>
                  </div>
                  <MiniLineChart data={dynamicTrend} />
                </div>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-peach-100/70 border border-border-peach/50 rounded-2xl p-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-green-soft mb-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      Est. Cost Savings
                    </span>
                    <span className="text-xl font-black text-ink">₹{result.costSavingsEst.toLocaleString()}</span>
                  </div>

                  <div className="bg-peach-100/70 border border-border-peach/50 rounded-2xl p-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-accent mb-1">
                      <Leaf className="w-3.5 h-3.5" />
                      CO₂ Waste Prevented
                    </span>
                    <span className="text-xl font-black text-ink">{result.co2SavedKg} kg</span>
                  </div>
                </div>

                {/* Feature Factors Breakdown */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block mb-2.5">
                    ML Feature Impact Drivers
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.factors.map((f, i) => (
                      <span
                        key={i}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                          f.type === 'positive'
                            ? 'bg-green-soft/10 border-green-soft/30 text-green-soft'
                            : f.type === 'negative'
                            ? 'bg-accent/10 border-accent/30 text-accent'
                            : 'bg-peach-200 border-border-peach text-ink-muted'
                        }`}
                      >
                        {f.name}: {f.impact}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Presentation Action Buttons */}
                <div className="pt-4 border-t border-border-peach flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCreateKitchenTicket}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-white font-semibold text-xs py-3 px-4 rounded-xl hover:bg-ink/90 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4 text-accent-light" />
                    Dispatch to Live Kitchen
                  </button>
                  <button
                    onClick={() => {
                      if (lastTicket) onOpenTicketModal(lastTicket);
                      else handleCreateKitchenTicket();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 border border-border-peach text-ink font-semibold text-xs py-3 px-4 rounded-xl hover:bg-peach-200/50 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-ink-muted" />
                    Print Ticket
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-peach-50 border border-dashed border-border-peach rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[380px]">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-ink text-lg mb-2">Ready to Run Inference</h4>
                <p className="text-xs text-ink-muted max-w-xs mb-6">
                  Hit "Predict Kitchen Preparation" to run real-time campus demand calculation and update all graphs dynamically.
                </p>
                <button
                  onClick={handlePredict}
                  className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-accent/90 transition-colors shadow-sm"
                >
                  Run Demo Inference
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
