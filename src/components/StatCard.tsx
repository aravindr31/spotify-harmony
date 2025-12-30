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
    primary: 'from-neon-purple/20 to-neon-blue/20 border-neon-purple/30',
    accent: 'from-neon-pink/20 to-neon-purple/20 border-neon-pink/30',
    cool: 'from-neon-blue/20 to-neon-cyan/20 border-neon-blue/30',
    warm: 'from-neon-orange/20 to-neon-pink/20 border-neon-orange/30',
  };

  const iconGradients = {
    primary: 'bg-gradient-primary',
    accent: 'bg-gradient-accent',
    cool: 'bg-gradient-cool',
    warm: 'bg-gradient-warm',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        'relative p-6 rounded-2xl bg-gradient-to-br border backdrop-blur-sm',
        gradientClasses[gradient]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-3xl md:text-4xl font-display font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-neon-green' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('p-3 rounded-xl', iconGradients[gradient])}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
