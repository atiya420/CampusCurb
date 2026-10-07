import { useState } from 'react';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';
import { DataPoint } from '@/types/campus';
import { campusOutlets, foodCatalog } from '@/lib/data';

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLog: (log: DataPoint) => void;
}

export function AddLogModal({ isOpen, onClose, onAddLog }: AddLogModalProps) {
  const [outlet, setOutlet] = useState('Central Canteen');
  const [item, setItem] = useState('Hyderabadi Chicken Biryani');
  const [students, setStudents] = useState(420);
  const [weather, setWeather] = useState<'Sunny' | 'Cloudy' | 'Rainy' | 'Cold' | 'Extreme Heat'>('Sunny');
  const [academicDay, setAcademicDay] = useState<'Normal' | 'Exam' | 'Holiday' | 'Event' | 'Weekend'>('Normal');
  const [sold, setSold] = useState(155);
  const [leftover, setLeftover] = useState(6);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPoint: DataPoint = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      outlet,
      item,
      students: Number(students),
      weather,
      tempCelsius: weather === 'Cold' ? 16 : weather === 'Rainy' ? 21 : 27,
      academicDay,
      sold: Number(sold),
      leftover: Number(leftover),
      predicted: Math.round(Number(sold) * 0.98),
      wasteSavedKg: parseFloat(((30 - Number(leftover)) * 0.45).toFixed(1)),
      moneySaved: (30 - Number(leftover)) * 105,
    };
    onAddLog(newPoint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-peach-50 border border-border-peach rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-border-peach pb-4 mb-5">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-ink text-base">Add Live Campus Log Entry</h3>
          </div>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink p-1 rounded-full hover:bg-peach-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Canteen Outlet</label>
              <select
                value={outlet}
                onChange={(e) => setOutlet(e.target.value)}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold"
              >
                {campusOutlets.filter(o => o.id !== 'all').map((o) => (
                  <option key={o.id} value={o.name}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Food Item</label>
              <select
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold"
              >
                {foodCatalog.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name} ({f.isVeg ? 'Veg' : 'Non-Veg'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Campus Students</label>
              <input
                type="number"
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold"
              />
            </div>
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Weather</label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value as any)}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold"
              >
                <option value="Sunny">Sunny</option>
                <option value="Cloudy">Cloudy</option>
                <option value="Rainy">Rainy</option>
                <option value="Cold">Cold</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Academic Day</label>
              <select
                value={academicDay}
                onChange={(e) => setAcademicDay(e.target.value as any)}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold"
              >
                <option value="Normal">Normal</option>
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
                <option value="Weekend">Weekend</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Actual Sold Units</label>
              <input
                type="number"
                value={sold}
                onChange={(e) => setSold(Number(e.target.value))}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold"
              />
            </div>
            <div>
              <label className="block font-semibold text-ink-muted mb-1">Leftover Units</label>
              <input
                type="number"
                value={leftover}
                onChange={(e) => setLeftover(Number(e.target.value))}
                className="w-full bg-white border border-border-peach rounded-lg px-3 py-2 text-ink font-semibold text-accent"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border-peach text-ink font-medium rounded-xl hover:bg-peach-200/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Dataset Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
