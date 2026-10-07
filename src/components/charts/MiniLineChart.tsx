interface MiniLineChartProps {
  data: number[];
}

export function MiniLineChart({ data }: MiniLineChartProps) {
  const width = 200;
  const height = 50;
  const padding = 4;

  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1;

  const xStep = (width - padding * 2) / (data.length - 1);

  const points = data
    .map((val, i) => {
      const x = padding + i * xStep;
      const y = padding + (height - padding * 2) - ((val - minVal) / range) * (height - padding * 2);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${points} L ${padding + (data.length - 1) * xStep} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 'auto' }}>
      <defs>
        <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E76F51" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E76F51" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#miniGrad)" />
      <path d={points} fill="none" stroke="#E76F51" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
