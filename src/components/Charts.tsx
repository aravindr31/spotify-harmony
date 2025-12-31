import { motion } from 'framer-motion';

interface AudioFeatureBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

export function AudioFeatureBar({ label, value, color, delay = 0 }: AudioFeatureBarProps) {
  const percentage = Math.round(value * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm capitalize">{label}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: 'easeOut' }}
          className="h-full rounded-full bg-primary"
          style={color ? { background: color } : undefined}
        />
      </div>
    </motion.div>
  );
}

interface MoodPieChartProps {
  data: { mood: string; percentage: number; color: string }[];
}

export function MoodPieChart({ data }: MoodPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  let currentAngle = -90;

  const segments = data.map((item) => {
    const angle = (item.percentage / total) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    };
    currentAngle += angle;
    return segment;
  });

  const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(50, 50, radius, endAngle);
    const end = polarToCartesian(50, 50, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {segments.map((segment, index) => (
            <motion.path
              key={segment.mood}
              d={createArcPath(segment.startAngle, segment.endAngle, 38)}
              fill="none"
              stroke={segment.color}
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold">{data[0]?.mood}</p>
            <p className="text-xs text-muted-foreground">Top Mood</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {data.map((item, index) => (
          <motion.div
            key={item.mood}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
            className="flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.mood}</span>
            <span className="text-sm text-muted-foreground">{item.percentage}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ListeningChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
}

export function ListeningChart({ data, maxValue }: ListeningChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-1.5 h-28">
      {data.map((item, index) => {
        const height = (item.value / max) * 100;
        return (
          <motion.div
            key={item.label}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="flex-1 bg-primary/80 hover:bg-primary rounded-t min-w-[10px] transition-colors cursor-pointer group relative"
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-0.5 rounded text-xs whitespace-nowrap border border-border">
              {item.value}m
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
