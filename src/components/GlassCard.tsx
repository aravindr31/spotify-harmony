import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  gradient?: 'primary' | 'accent' | 'cool' | 'warm' | 'none';
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  gradient = 'none',
  glow = false,
  hover = true,
}: GlassCardProps) {
  const gradientClasses = {
    primary: 'before:bg-gradient-primary before:opacity-10',
    accent: 'before:bg-gradient-accent before:opacity-10',
    cool: 'before:bg-gradient-cool before:opacity-10',
    warm: 'before:bg-gradient-warm before:opacity-10',
    none: '',
  };

  const glowClasses = {
    primary: 'glow-primary',
    accent: 'glow-accent',
    cool: 'glow-secondary',
    warm: 'glow-accent',
    none: '',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative overflow-hidden rounded-2xl glass border border-border/50',
        gradient !== 'none' && 'before:absolute before:inset-0 before:pointer-events-none',
        gradientClasses[gradient],
        glow && glowClasses[gradient],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
