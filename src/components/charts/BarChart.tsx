interface BarChartProps {
  data: { item: string; demand: number; wasteReduction?: string }[];
}

export function BarChart({ data }: BarChartProps) {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map((d) => d.demand), 10) * 1.15;

  return (
    <div className="space-y-4">
      {data.map((d) => {
        const pct = Math.min(100, (d.demand / maxVal) * 100);
        return (
          <div key={d.item} className="flex items-center gap-3 group">
            <div className="w-36 text-xs font-bold text-ink text-right shrink-0 truncate">
              {d.item}
            </div>
            <div className="flex-1 h-7 bg-peach-200/80 rounded-lg overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-accent via-accent-light to-accent rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2.5"
                style={{ width: `${Math.max(8, pct)}%` }}
              >
                <span className="text-[11px] font-extrabold text-white leading-none">
                  {d.demand}
                </span>
              </div>
            </div>
            {d.wasteReduction && (
              <div className="w-16 text-[11px] font-bold text-green-soft shrink-0 text-right bg-green-soft/10 px-2 py-1 rounded-md border border-green-soft/20">
                {d.wasteReduction} saved
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
