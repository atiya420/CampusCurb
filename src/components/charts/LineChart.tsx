import { useState } from 'react';

interface LineChartProps {
  data: { date: string; actual: number; predicted: number }[];
  maxDomain?: number;
}

export function LineChart({ data, maxDomain }: LineChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 720;
  const height = 240;
  const padding = { top: 25, right: 24, bottom: 36, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minVal = 0;
  const xStep = chartW / Math.max(1, data.length - 1);
  const allValues = data.flatMap((d) => [d.actual, d.predicted]);
  const rawMax = Math.max(...allValues, 10);
  // Use stable stepped ceiling so line visibly rises and falls when inputs change
  const maxVal = maxDomain ?? Math.max(380, Math.ceil((rawMax * 1.15) / 50) * 50);

  const toX = (i: number) => padding.left + i * xStep;
  const toY = (val: number) =>
    padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  const actualPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.actual)}`)
    .join(' ');

  const predictedPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.predicted)}`)
    .join(' ');

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => {
    const y = padding.top + chartH * t;
    const val = Math.round(maxVal - (maxVal - minVal) * t);
    return { y, val };
  });

  const areaPath = `${actualPath} L ${toX(data.length - 1)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`;

  return (
    <div className="w-full overflow-x-auto relative group">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[520px]"
        style={{ height: 'auto' }}
      >
        <defs>
          <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E76F51" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E76F51" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={g.y}
              x2={width - padding.right}
              y2={g.y}
              stroke="#EBD8CA"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <text
              x={padding.left - 8}
              y={g.y + 4}
              textAnchor="end"
              className="fill-[#756F69]"
              fontSize="11"
            >
              {g.val}
            </text>
          </g>
        ))}

        {/* Area glow under actual path */}
        <path
          d={areaPath}
          fill="url(#actualGradient)"
          className="transition-all duration-700 ease-out pointer-events-none"
        />

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={toX(i)}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            className={`fill-[#756F69] text-[11px] font-semibold transition-all ${
              hoveredIdx === i ? 'fill-accent font-bold scale-110' : ''
            }`}
          >
            {d.date}
          </text>
        ))}

        {/* Predicted line (dashed) */}
        <path
          d={predictedPath}
          fill="none"
          stroke="#F4A261"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Actual line (solid) */}
        <path
          d={actualPath}
          fill="none"
          stroke="#E76F51"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Interactive Hover Point Markers */}
        {data.map((d, i) => {
          const cx = toX(i);
          const cyActual = toY(d.actual);
          const cyPred = toY(d.predicted);
          const isHovered = hoveredIdx === i;

          return (
            <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
              {/* Invisible touch line */}
              <line
                x1={cx}
                y1={padding.top}
                x2={cx}
                y2={height - padding.bottom}
                stroke={isHovered ? '#E76F51' : 'transparent'}
                strokeWidth={isHovered ? '1.5' : '12'}
                strokeDasharray={isHovered ? '2 2' : 'none'}
                className="cursor-pointer transition-all"
              />

              {/* Predicted circle */}
              <circle
                cx={cx}
                cy={cyPred}
                r={isHovered ? '5' : '3.5'}
                fill="#F4A261"
                stroke="#FFF9F5"
                strokeWidth="1.5"
                className="transition-all duration-500 ease-out cursor-pointer"
              />

              {/* Actual circle */}
              <circle
                cx={cx}
                cy={cyActual}
                r={isHovered ? '6' : '4'}
                fill="#E76F51"
                stroke="#FFF9F5"
                strokeWidth="2"
                className="transition-all duration-500 ease-out cursor-pointer"
              />

              {/* Tooltip on hover */}
              {isHovered && (
                <g className="pointer-events-none">
                  <rect
                    x={Math.min(width - 120, Math.max(10, cx - 55))}
                    y={Math.max(10, Math.min(cyActual, cyPred) - 45)}
                    width="110"
                    height="38"
                    rx="6"
                    fill="#292522"
                    opacity="0.92"
                  />
                  <text
                    x={Math.min(width - 120, Math.max(10, cx - 55)) + 55}
                    y={Math.max(10, Math.min(cyActual, cyPred) - 45) + 16}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    Actual: {d.actual} plates
                  </text>
                  <text
                    x={Math.min(width - 120, Math.max(10, cx - 55)) + 55}
                    y={Math.max(10, Math.min(cyActual, cyPred) - 45) + 30}
                    textAnchor="middle"
                    fill="#F4A261"
                    fontSize="10"
                    fontWeight="medium"
                  >
                    Predicted: {d.predicted} plates
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
