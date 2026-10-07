import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { Search, PlusCircle, Filter, Download, CheckCircle2 } from 'lucide-react';
import { DataPoint } from '@/types/campus';

interface DatasetProps {
  data: DataPoint[];
  onOpenAddModal: () => void;
}

export function Dataset({ data, onOpenAddModal }: DatasetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeather, setSelectedWeather] = useState<string>('All');

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.outlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.date.includes(searchQuery);
    const matchesWeather = selectedWeather === 'All' || row.weather === selectedWeather;
    return matchesSearch && matchesWeather;
  });

  const exportCSV = () => {
    const headers = ['Date,Outlet,Item,Students,Weather,Sold,Leftover,Predicted,MoneySaved(₹)'];
    const rows = filteredData.map(
      (r) => `${r.date},${r.outlet},${r.item},${r.students},${r.weather},${r.sold},${r.leftover},${r.predicted},${r.moneySaved}`
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CampusCurbs_Historical_Dataset.csv';
    a.click();
  };

  return (
    <section id="dataset" className="py-20 lg:py-28 bg-peach-50 border-t border-border-peach">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-accent tracking-eyebrow uppercase block mb-1">
                HISTORICAL TRAINING DATASET
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight">
                Campus Activity & Kitchen Logs
              </h2>
              <p className="text-sm text-ink-muted mt-1">
                Raw training data feeding our ML Random Forest Regressor.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center gap-1.5 bg-accent text-white font-semibold text-xs py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Add Live Campus Log
              </button>

              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 border border-border-peach text-ink font-semibold text-xs py-2.5 px-4 rounded-xl hover:bg-peach-200/50 transition-colors"
              >
                <Download className="w-4 h-4 text-ink-muted" />
                Export CSV
              </button>
            </div>
          </div>
        </Reveal>

        {/* Search & Filter Toolbar */}
        <Reveal delay={100}>
          <div className="bg-white border border-border-peach rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food, outlet, date..."
                className="w-full pl-10 pr-4 py-2 bg-peach-50 border border-border-peach rounded-xl text-xs text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-ink-muted flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Weather:
              </span>
              {['All', 'Sunny', 'Cloudy', 'Rainy'].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeather(w)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedWeather === w
                      ? 'bg-ink text-white'
                      : 'bg-peach-100 text-ink-muted hover:text-ink'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Data Table */}
        <Reveal delay={150}>
          <div className="bg-white border border-border-peach rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-peach-100/70 border-b border-border-peach">
                  <tr>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Outlet</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Target Item</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Footfall</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Weather</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Actual Sold</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">AI Predicted</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Leftover</th>
                    <th className="px-6 py-4 font-bold text-ink-muted uppercase tracking-wider">Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-peach/50">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-peach-50/80 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-ink-muted">{row.date}</td>
                        <td className="px-6 py-4 font-bold text-ink">{row.outlet}</td>
                        <td className="px-6 py-4 font-semibold text-ink">{row.item}</td>
                        <td className="px-6 py-4 text-ink-muted">{row.students} students</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-peach-100 text-ink">
                            {row.weather} ({row.tempCelsius}°C)
                          </span>
                        </td>
                        <td className="px-6 py-4 font-extrabold text-ink">{row.sold} plates</td>
                        <td className="px-6 py-4 font-bold text-accent">{row.predicted} plates</td>
                        <td className="px-6 py-4 font-bold">
                          <span className={row.leftover > 10 ? 'text-accent' : 'text-green-soft'}>
                            {row.leftover} plates
                          </span>
                        </td>
                        <td className="px-6 py-4 font-extrabold text-green-soft">₹{row.moneySaved}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center text-ink-muted">
                        No matching dataset logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
