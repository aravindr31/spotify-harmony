import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  gradient?: 'primary' | 'accent' | 'cool' | 'warm';
  delay?: number;
}

export function StatCard({ label, value, icon, trend, gradient = 'primary', delay = 0 }: StatCardProps) {
  const gradientClasses = {
    primary: 'bg-primary/10 border-primary/20',
    accent: 'bg-accent/10 border-accent/20',
    cool: 'bg-secondary/10 border-secondary/20',
    warm: 'bg-primary/10 border-primary/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        'relative p-4 rounded-xl border',
        gradientClasses[gradient]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-1.5">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-primary' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/20 text-primary">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
