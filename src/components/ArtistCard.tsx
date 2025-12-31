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
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group flex flex-col items-center gap-2 cursor-pointer"
      >
        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-200 bg-muted">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 rounded-full flex items-center justify-center bg-background/50"
          >
            <Play className="w-8 h-8 text-primary" fill="currentColor" />
          </motion.div>
          {rank && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-primary-foreground">
              {rank}
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate max-w-[100px]">
            {artist.name}
          </h3>
          <p className="text-xs text-muted-foreground">{formatFollowers(artist.followers)}</p>
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
      className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-200 cursor-pointer"
    >
      <div className="relative aspect-square bg-muted">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

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

        {rank && (
          <div className="absolute top-2 left-2">
            <span className="text-2xl font-semibold text-primary">
              #{rank}
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium truncate group-hover:text-primary transition-colors">
          {artist.name}
        </h3>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {artist.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{formatFollowers(artist.followers)}</span>
        </div>
      </div>
    </motion.div>
  );
}
