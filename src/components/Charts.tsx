import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium capitalize">{label}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-primary"
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
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {segments.map((segment, index) => (
            <motion.path
              key={segment.mood}
              d={createArcPath(segment.startAngle, segment.endAngle, 40)}
              fill="none"
              stroke={segment.color}
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-display font-bold">{data[0]?.mood}</p>
            <p className="text-sm text-muted-foreground">Top Mood</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.mood}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            <span
              className="w-3 h-3 rounded-full"
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
    <div className="flex items-end gap-1 h-32">
      {data.map((item, index) => {
        const height = (item.value / max) * 100;
        return (
          <motion.div
            key={item.label}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t-sm min-w-[8px] hover:from-neon-pink hover:to-neon-purple transition-colors cursor-pointer group relative"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs whitespace-nowrap border border-border">
              {item.value} min
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
