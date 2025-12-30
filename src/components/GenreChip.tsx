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
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 rounded-full bg-muted/50 border border-border/50 font-medium ${sizeClasses[size]}`}
      style={color ? { borderColor: color, color } : undefined}
    >
      {color && (
        <span
          className="w-2 h-2 rounded-full"
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
