import { motion } from 'framer-motion';
import { Play, Disc } from 'lucide-react';
import { useState } from 'react';

interface AlbumCardProps {
  album: any;
  rank?: number;
  variant?: 'default' | 'compact' | 'featured';
}

export function AlbumCard({ album, rank, variant = 'default' }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const artistName = album.artists?.map((a: any) => a.name).join(', ') || 'Unknown Artist';
  const albumImage = album.images?.[0]?.url;
  const releaseYear = album.release_date ? new Date(album.release_date).getFullYear() : '';

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 2 }}
        onClick={() => window.open(album.external_urls.spotify, '_blank')}
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
      >
        {rank && (
          <span className="w-5 text-sm text-muted-foreground group-hover:text-primary transition-colors">
            #{rank}
          </span>
        )}
        <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
          <img src={albumImage} alt={album.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{album.name}</p>
          <p className="text-xs text-muted-foreground truncate">{artistName}</p>
        </div>
        <span className="text-xs text-muted-foreground">{releaseYear}</span>
      </motion.div>
    );
  }
  if (variant === 'featured') {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => window.open(album.external_urls.spotify, '_blank')}
      className="relative group cursor-pointer"
    >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">

      <img 
        src={albumImage} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        alt={album.name}
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

            <h3 className="text-lg font-semibold mt-1 truncate">{album.name}</h3>
            <p className="text-muted-foreground text-sm truncate">{artistName}</p>
          </div>
        </div>
      </motion.div>
  );
}
}