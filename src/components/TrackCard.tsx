import { motion } from 'framer-motion';
import { Track } from '@/types/spotify';
import { Play, Pause, Heart } from 'lucide-react';
import { useState } from 'react';

interface TrackCardProps {
  track: Track;
  rank?: number;
  variant?: 'default' | 'compact' | 'featured';
}

export function TrackCard({ track, rank, variant = 'default' }: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 4 }}
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
      >
        {rank && (
          <span className="w-6 text-sm font-display text-muted-foreground group-hover:text-primary transition-colors">
            {rank}
          </span>
        )}
        <div className="relative w-10 h-10 rounded overflow-hidden">
          <img
            src={track.albumImage}
            alt={track.album}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{track.name}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
        <span className="text-xs text-muted-foreground">{formatDuration(track.duration)}</span>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group cursor-pointer"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <img
            src={track.albumImage}
            alt={track.album}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center glow-primary"
            >
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            </motion.button>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            {rank && (
              <span className="text-6xl font-display font-bold text-gradient-primary opacity-80">
                #{rank}
              </span>
            )}
            <h3 className="text-xl font-display font-bold mt-2 truncate">{track.name}</h3>
            <p className="text-muted-foreground truncate">{track.artist}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:glow-primary"
    >
      <div className="relative aspect-square">
        <img
          src={track.albumImage}
          alt={track.album}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg"
          >
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </motion.button>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isLiked ? 'text-neon-pink fill-neon-pink' : 'text-foreground'}`}
          />
        </motion.button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
              {track.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          </div>
          {rank && (
            <span className="shrink-0 text-2xl font-display font-bold text-gradient-primary">
              #{rank}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>{track.album}</span>
          <span>{formatDuration(track.duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}
