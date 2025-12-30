import { motion } from 'framer-motion';
import { Artist } from '@/types/spotify';
import { Play, Users } from 'lucide-react';
import { useState } from 'react';

interface ArtistCardProps {
  artist: Artist;
  rank?: number;
  variant?: 'default' | 'compact' | 'circle';
}

export function ArtistCard({ artist, rank, variant = 'default' }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
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
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{artist.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {artist.genres.slice(0, 2).join(', ')}
          </p>
        </div>
      </motion.div>
    );
  }

  if (variant === 'circle') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group flex flex-col items-center gap-3 cursor-pointer"
      >
        <div className="relative">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all duration-300">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 rounded-full flex items-center justify-center bg-background/60 backdrop-blur-sm"
          >
            <Play className="w-10 h-10 text-primary" fill="currentColor" />
          </motion.div>
          {rank && (
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground">
              {rank}
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="font-semibold group-hover:text-primary transition-colors truncate max-w-[140px]">
            {artist.name}
          </h3>
          <p className="text-xs text-muted-foreground">{formatFollowers(artist.followers)} followers</p>
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
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:glow-primary cursor-pointer"
    >
      <div className="relative aspect-square">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

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

        {rank && (
          <div className="absolute top-3 left-3">
            <span className="text-4xl font-display font-bold text-gradient-primary">
              #{rank}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-lg truncate group-hover:text-primary transition-colors">
          {artist.name}
        </h3>
        <div className="flex flex-wrap gap-1 mt-2">
          {artist.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{formatFollowers(artist.followers)} followers</span>
        </div>
      </div>
    </motion.div>
  );
}
