import { useState, useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { campusOutlets } from '@/lib/data';
import { useCountUp } from '@/hooks/useCountUp';
import { Filter, DollarSign, Leaf, ShieldCheck } from 'lucide-react';

function StatBlock({ value, suffix, label, sublabel }: { value: number; suffix?: string; label: string; sublabel?: string }) {
  const animated = useCountUp(value, 1000, true);
  return (
    <div className="bg-peach-50 border border-border-peach rounded-2xl p-6 text-center shadow-sm hover:border-accent/40 transition-all duration-300">
      <div className="flex items-end justify-center gap-1">
        <span className="text-3xl md:text-4xl font-extrabold text-ink leading-none">
          {animated}
        </span>
        {suffix && <span className="text-lg font-bold text-accent mb-0.5">{suffix}</span>}
      </div>
      <p className="text-xs font-bold text-ink mt-2 uppercase tracking-wider">{label}</p>
      {sublabel && <p className="text-[11px] text-ink-muted mt-0.5">{sublabel}</p>}
    </div>
  );
}

const outletConfigs: Record<string, { mult: number; avgWaste: number; moneyMult: number; topItems: { item: string; base: number; waste: string }[] }> = {
  all: {
    mult: 1.0,
    avgWaste: 3.8,
    moneyMult: 168500,
    topItems: [
      { item: 'Hyderabadi Chicken Biryani', base: 485, waste: '94%' },
      { item: 'Iced Cold Coffee', base: 420, waste: '96%' },
      { item: 'Chicken Kathi Roll', base: 380, waste: '89%' },
      { item: 'Butter Chicken with Naan', base: 320, waste: '93%' },
      { item: 'Crispy Chicken Burger', base: 290, waste: '90%' },
      { item: 'Special Mango Lassi', base: 260, waste: '95%' },
    ],
  },
  central: {
    mult: 1.25,
    avgWaste: 3.2,
    moneyMult: 85000,
    topItems: [
      { item: 'Hyderabadi Chicken Biryani', base: 560, waste: '96%' },
      { item: 'Butter Chicken with Naan', base: 430, waste: '94%' },
      { item: 'Deluxe Veg Thali', base: 390, waste: '92%' },
      { item: 'Special Egg Roll', base: 280, waste: '89%' },
      { item: 'Crispy Samosa (Pair)', base: 240, waste: '95%' },
    ],
  },
  yuba: {
    mult: 1.05,
    avgWaste: 3.6,
    moneyMult: 48000,
    topItems: [
      { item: 'Iced Cold Coffee', base: 520, waste: '97%' },
      { item: 'Chicken Kathi Roll', base: 460, waste: '92%' },
      { item: 'Crispy Chicken Burger', base: 380, waste: '91%' },
      { item: 'Thick Chocolate Shake', base: 310, waste: '94%' },
      { item: 'Special Egg Roll', base: 270, waste: '88%' },
    ],
  },
  motherdairy: {
    mult: 0.85,
    avgWaste: 2.8,
    moneyMult: 28000,
    topItems: [
      { item: 'Iced Cold Coffee', base: 450, waste: '98%' },
      { item: 'Special Mango Lassi', base: 380, waste: '96%' },
      { item: 'Fresh Lemon Soda', base: 320, waste: '95%' },
      { item: 'Crispy Samosa (Pair)', base: 290, waste: '94%' },
    ],
  },
  alameens: {
    mult: 1.15,
    avgWaste: 4.1,
    moneyMult: 62000,
    topItems: [
      { item: 'Hyderabadi Chicken Biryani', base: 510, waste: '93%' },
      { item: 'Tandoori Chicken Combo', base: 440, waste: '92%' },
      { item: 'Chicken Kathi Roll', base: 390, waste: '90%' },
      { item: 'Butter Chicken with Naan', base: 350, waste: '91%' },
    ],
  },
  nutrifresh: {
    mult: 0.75,
    avgWaste: 3.4,
    moneyMult: 22000,
    topItems: [
      { item: 'Deluxe Veg Thali', base: 380, waste: '94%' },
      { item: 'Paneer Butter Masala Combo', base: 340, waste: '93%' },
      { item: 'Fresh Lemon Soda', base: 290, waste: '96%' },
      { item: 'Iced Cold Coffee', base: 260, waste: '95%' },
    ],
  },
};

const base7dDates = ['Mon Oct 04', 'Tue Oct 05', 'Wed Oct 06', 'Thu Oct 07', 'Fri Oct 08', 'Sat Oct 09', 'Sun Oct 10'];
const base7dActuals = [142, 138, 165, 104, 178, 152, 188];
const base7dPredicted = [145, 135, 160, 108, 175, 148, 185];

const base30dDates = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
const base30dActuals = [980, 1040, 1120, 890, 1210, 1150];
const base30dPredicted = [995, 1030, 1105, 910, 1195, 1160];

const baseSemesterDates = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const baseSemesterActuals = [3400, 4200, 4550, 4800, 4100, 3900];
const baseSemesterPredicted = [3450, 4180, 4500, 4760, 4120, 3940];

const itemWaveProfiles: Record<string, number[]> = {
  all: [142, 138, 165, 104, 178, 152, 188],
  biryani: [110, 125, 220, 135, 250, 190, 275], // Double peak on Wed/Fri/Sun
  coldcoffee: [95, 110, 130, 150, 210, 295, 330], // Steep weekend surge
  chickenroll: [150, 140, 160, 155, 185, 170, 160], // Steady daily snack trend
  butterchicken: [120, 135, 185, 140, 220, 210, 230], // High dinner & weekend rush
  burger: [130, 145, 150, 160, 190, 220, 205], // Evening & weekend hangout
  lassi: [160, 175, 180, 145, 130, 120, 110], // High weekday afternoon
  thali: [170, 180, 175, 160, 150, 120, 115], // High weekday lunch
};

const weatherWaveModifiers: Record<string, number[]> = {
  Sunny: [1.1, 1.12, 1.15, 1.08, 1.2, 1.25, 1.22],
  Cloudy: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  Rainy: [0.85, 0.75, 0.55, 0.45, 0.65, 0.8, 0.85], // Deep V-canyon drop
  Cold: [1.05, 1.1, 1.15, 1.2, 1.05, 0.95, 0.9],
  'Extreme Heat': [1.2, 1.25, 1.3, 1.2, 1.35, 1.4, 1.35],
};

const foodMultipliers: Record<string, { label: string; mult: number }> = {
  all: { label: 'All Items Combined', mult: 1.0 },
  biryani: { label: 'Hyderabadi Chicken Biryani', mult: 1.38 },
  coldcoffee: { label: 'Iced Cold Coffee', mult: 1.22 },
  chickenroll: { label: 'Chicken Kathi Roll', mult: 1.10 },
  butterchicken: { label: 'Butter Chicken with Naan', mult: 1.28 },
  burger: { label: 'Crispy Chicken Burger', mult: 1.08 },
  lassi: { label: 'Special Mango Lassi', mult: 0.95 },
  thali: { label: 'Deluxe Veg Thali', mult: 0.90 },
};

const weatherMultipliers: Record<string, { label: string; mult: number }> = {
  Sunny: { label: 'Sunny ☀️ (+15% Demand)', mult: 1.15 },
  Cloudy: { label: 'Cloudy ⛅ (Normal Demand)', mult: 1.0 },
  Rainy: { label: 'Rainy 🌧️ (-22% Movement Shift)', mult: 0.78 },
  Cold: { label: 'Cold ❄️ (Warm Meals Preferred)', mult: 0.92 },
  'Extreme Heat': { label: 'Extreme Heat 🌡️ (+30% Beverages)', mult: 1.25 },
};

export function Dashboard() {
  const [selectedOutlet, setSelectedOutlet] = useState('all');
  const [selectedFoodKey, setSelectedFoodKey] = useState('all');
  const [weatherCondition, setWeatherCondition] = useState('Sunny');
  const [studentsCount, setStudentsCount] = useState(420);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'semester'>('7d');

  // Compute dynamic chart data with distinct profile wave shapes & Y-axis scaling
  const dynamicLineData = useMemo(() => {
    const config = outletConfigs[selectedOutlet] ?? outletConfigs.all;
    const foodMult = foodMultipliers[selectedFoodKey]?.mult ?? 1.0;
    const weatherMult = weatherMultipliers[weatherCondition]?.mult ?? 1.0;
    const studentMult = studentsCount / 400;
    const overallScale = config.mult * foodMult * weatherMult * studentMult;

    let dates = base7dDates;
    const profile = itemWaveProfiles[selectedFoodKey] ?? itemWaveProfiles.all;
    const wMod = weatherWaveModifiers[weatherCondition] ?? weatherWaveModifiers.Cloudy;

    if (timeframe === '30d') {
      dates = base30dDates;
      return dates.map((date, i) => {
        const act = Math.round(base30dActuals[i] * overallScale);
        const pred = Math.round(base30dPredicted[i] * overallScale);
        return { date, actual: act, predicted: pred };
      });
    } else if (timeframe === 'semester') {
      dates = baseSemesterDates;
      return dates.map((date, i) => {
        const act = Math.round(baseSemesterActuals[i] * overallScale);
        const pred = Math.round(baseSemesterPredicted[i] * overallScale);
        return { date, actual: act, predicted: pred };
      });
    }

    // 7-day mode: Apply distinct profile wave shape per item & weather condition
    return dates.map((date, i) => {
      const baseVal = profile[i] ?? base7dActuals[i];
      const mod = wMod[i] ?? 1.0;
      const actual = Math.round(baseVal * config.mult * studentMult * mod);
      const predicted = Math.round(actual * (i % 2 === 0 ? 0.97 : 1.02));
      return { date, actual, predicted };
    });
  }, [selectedOutlet, selectedFoodKey, weatherCondition, studentsCount, timeframe]);

  const dynamicBarData = useMemo(() => {
    const config = outletConfigs[selectedOutlet] ?? outletConfigs.all;
    const foodMult = foodMultipliers[selectedFoodKey]?.mult ?? 1.0;
    const weatherMult = weatherMultipliers[weatherCondition]?.mult ?? 1.0;
    const studentMult = studentsCount / 400;
    const timeMult = timeframe === '30d' ? 4.2 : timeframe === 'semester' ? 18.0 : 1.0;

    return config.topItems.map((item) => ({
      item: item.item,
      demand: Math.round(item.base * foodMult * weatherMult * studentMult * (timeframe === '7d' ? 1 : timeMult / 3.5)),
      wasteReduction: item.waste,
    }));
  }, [selectedOutlet, selectedFoodKey, weatherCondition, studentsCount, timeframe]);

  const currentConfig = outletConfigs[selectedOutlet] ?? outletConfigs.all;
  const foodMult = foodMultipliers[selectedFoodKey]?.mult ?? 1.0;
  const weatherMult = weatherMultipliers[weatherCondition]?.mult ?? 1.0;
  const studentMult = studentsCount / 400;
  const combinedMult = currentConfig.mult * foodMult * weatherMult * studentMult;

  const timeFactor = timeframe === '30d' ? 4.0 : timeframe === 'semester' ? 16.0 : 1.0;

  const calculatedAvgDemand = Math.round(432 * combinedMult * (timeframe === '7d' ? 1 : timeframe === '30d' ? 4.1 : 16.2));
  const calculatedMoneySaved = Math.round(currentConfig.moneyMult * combinedMult * timeFactor);
  const calculatedFoodSaved = Math.round(1420 * combinedMult * (timeframe === '7d' ? 1 : timeframe === '30d' ? 4.0 : 15.5));
  const calculatedCo2Saved = Math.round(calculatedFoodSaved * 2.5);

  const peakDemand = useMemo(() => {
    return Math.max(...dynamicLineData.map((d) => d.actual), 10);
  }, [dynamicLineData]);

  const activeOutletName = campusOutlets.find((o) => o.id === selectedOutlet)?.name ?? 'All Outlets';
  const activeFoodName = foodMultipliers[selectedFoodKey]?.label ?? 'All Items';

  return (
    <section id="dashboard" className="py-20 lg:py-28 bg-peach-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-border-peach/80 pb-6">
            <div>
              <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-1">
                REAL-TIME ANALYTICS DASHBOARD
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight">
                Demand & Waste Overview
              </h2>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center bg-peach-50 border border-border-peach rounded-xl p-1 text-xs font-semibold shadow-sm">
              <button
                onClick={() => setTimeframe('7d')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  timeframe === '7d' ? 'bg-accent text-white shadow-sm font-bold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeframe('30d')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  timeframe === '30d' ? 'bg-accent text-white shadow-sm font-bold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeframe('semester')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  timeframe === 'semester' ? 'bg-accent text-white shadow-sm font-bold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Semester
              </button>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Model Control Panel */}
        <Reveal delay={50}>
          <div className="bg-peach-50 border border-border-peach rounded-2xl p-5 mb-10 shadow-sm">
            <div className="flex items-center justify-between border-b border-border-peach/60 pb-3 mb-4">
              <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-accent" />
                Live Graph Input Simulator (Adjust to see curve morph)
              </span>
              <span className="text-[11px] font-bold text-green-soft bg-green-soft/10 px-2.5 py-0.5 rounded-full border border-green-soft/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-soft animate-ping" />
                Real-Time Reactive
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Outlet Selector */}
              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-1.5">
                  Canteen Outlet
                </label>
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full bg-white border border-border-peach rounded-xl px-3 py-2 text-xs font-bold text-ink hover:border-accent/40 cursor-pointer"
                >
                  {campusOutlets.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Food Item Selector */}
              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-1.5">
                  Food Item
                </label>
                <select
                  value={selectedFoodKey}
                  onChange={(e) => setSelectedFoodKey(e.target.value)}
                  className="w-full bg-white border border-border-peach rounded-xl px-3 py-2 text-xs font-bold text-ink hover:border-accent/40 cursor-pointer"
                >
                  {Object.entries(foodMultipliers).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weather Condition */}
              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-1.5">
                  Weather
                </label>
                <select
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="w-full bg-white border border-border-peach rounded-xl px-3 py-2 text-xs font-bold text-ink hover:border-accent/40 cursor-pointer"
                >
                  {Object.entries(weatherMultipliers).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campus Footfall Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                    Footfall
                  </label>
                  <span className="text-xs font-bold text-accent">{studentsCount} Students</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="650"
                  step="10"
                  value={studentsCount}
                  onChange={(e) => setStudentsCount(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer mt-1"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Top 4 Dynamic KPI Metrics */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <StatBlock
              value={calculatedAvgDemand}
              label={timeframe === '7d' ? 'Avg Daily Demand' : timeframe === '30d' ? 'Monthly Demand' : 'Semester Demand'}
              sublabel="Plates & drinks prepared"
            />
            <StatBlock
              value={3}
              suffix={`.${currentConfig.avgWaste.toFixed(0)}%`}
              label="Avg Leftover Waste"
              sublabel="Down from 19.4% baseline"
            />
            <StatBlock
              value={94}
              suffix=".6%"
              label="ML Model Accuracy"
              sublabel="Random Forest R² Score"
            />
            <StatBlock
              value={Math.round(calculatedMoneySaved / 1000)}
              suffix="k ₹"
              label="Total Money Saved"
              sublabel={`For ${activeOutletName}`}
            />
          </div>
        </Reveal>

        {/* Dynamic Actual vs Predicted Demand Line Chart */}
        <Reveal delay={150}>
          <div className="bg-peach-50 border border-border-peach rounded-3xl p-7 lg:p-9 shadow-sm mb-12 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 border-b border-border-peach/60 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-ink">Actual vs AI-Predicted Demand Trend</h3>
                  <span className="text-[10px] font-extrabold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                    PEAK: {peakDemand} PLATES
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  Simulated comparison for <span className="font-bold text-ink">{activeOutletName}</span> ({activeFoodName} · {weatherCondition} · {studentsCount} students).
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-accent rounded-full" />
                  <span className="text-ink">Actual Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 border-t-2 border-dashed border-accent-light rounded-full" />
                  <span className="text-ink-muted">AI Predicted</span>
                </div>
              </div>
            </div>

            <LineChart data={dynamicLineData} />
          </div>
        </Reveal>

        {/* Dynamic Food Demand Breakdown & Waste Saved Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-peach-50 border border-border-peach rounded-3xl p-7 shadow-sm">
            <h3 className="text-xl font-bold text-ink mb-1">Item-wise Demand & Efficiency</h3>
            <p className="text-xs text-ink-muted mb-6">
              Menu item volume breakdown for <span className="font-semibold text-ink">{activeOutletName}</span>.
            </p>
            <BarChart data={dynamicBarData} />
          </div>

          <div className="lg:col-span-5 bg-peach-50 border border-border-peach rounded-3xl p-7 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-ink mb-1">Campus Sustainability Impact</h3>
              <p className="text-xs text-ink-muted mb-6">Calculated metrics based on your filter inputs.</p>

              <div className="space-y-4 text-xs font-semibold">
                <div className="p-4 bg-peach-100/70 border border-border-peach/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-soft/15 text-green-soft flex items-center justify-center">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ink font-bold block">{calculatedFoodSaved.toLocaleString()} kg Food Saved</span>
                      <span className="text-ink-muted font-normal text-[11px]">Prevented from landfill</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-peach-100/70 border border-border-peach/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ink font-bold block">₹{calculatedMoneySaved.toLocaleString()} Saved</span>
                      <span className="text-ink-muted font-normal text-[11px]">Direct kitchen ingredient savings</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-peach-100/70 border border-border-peach/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-ink/10 text-ink flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ink font-bold block">{calculatedCo2Saved.toLocaleString()} kg CO₂ Prevented</span>
                      <span className="text-ink-muted font-normal text-[11px]">Emissions saved from cooking & transport</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-peach text-center">
              <span className="text-[11px] font-semibold text-ink-muted flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-soft inline-block" />
                Live Dynamic Syncing Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
