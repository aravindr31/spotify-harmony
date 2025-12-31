import { motion } from 'framer-motion';
import { Track } from '@/types/spotify';
import { Play, Heart } from 'lucide-react';
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
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 2 }}
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
      >
        {rank && (
          <span className="w-5 text-sm text-muted-foreground group-hover:text-primary transition-colors">
            {rank}
          </span>
        )}
        <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group cursor-pointer"
      >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={track.albumImage}
            alt={track.album}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/30"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
            </motion.button>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            {rank && (
              <span className="text-5xl font-bold text-primary/80">
                #{rank}
              </span>
            )}
            <h3 className="text-lg font-semibold mt-1 truncate">{track.name}</h3>
            <p className="text-muted-foreground text-sm truncate">{track.artist}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-200"
    >
      <div className="relative aspect-square bg-muted">
        <img
          src={track.albumImage}
          alt={track.album}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg"
          >
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </motion.button>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/70 flex items-center justify-center"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${isLiked ? 'text-primary fill-primary' : 'text-foreground'}`}
          />
        </motion.button>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {track.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
          </div>
          {rank && (
            <span className="shrink-0 text-lg font-semibold text-primary">
              #{rank}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span className="truncate">{track.album}</span>
          <span>{formatDuration(track.duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}
