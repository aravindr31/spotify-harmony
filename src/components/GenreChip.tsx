import { motion } from 'framer-motion';

interface GenreChipProps {
  genre: string;
  percentage?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export function GenreChip({ genre, percentage, color, size = 'md', delay = 0 }: GenreChipProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay }}
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center gap-1.5 rounded-full bg-muted/50 border border-border/50 font-medium ${sizeClasses[size]}`}
      style={color ? { borderColor: color } : undefined}
    >
      {color && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="capitalize">{genre}</span>
      {percentage !== undefined && (
        <span className="text-muted-foreground">{percentage}%</span>
      )}
    </motion.span>
  );
}
