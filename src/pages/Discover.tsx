import { motion } from 'framer-motion';
import { Music, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrackCard } from '@/components/TrackCard';
import { ArtistCard } from '@/components/ArtistCard';
import { mockTracks, mockArtists } from '@/data/mockSpotifyData';

export default function Discover() {
  return (
    <div className="min-h-screen bg-background noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px]" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Music className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">Resonance</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            <span className="text-gradient-primary">Discover</span> Music
          </h1>
          <p className="text-muted-foreground mt-2">Explore trending tracks and artists</p>
        </motion.div>

        {/* Featured Track */}
        <section className="mt-12">
          <h2 className="text-xl font-display font-semibold mb-6">Featured Track</h2>
          <div className="max-w-md">
            <TrackCard track={mockTracks[0]} rank={1} variant="featured" />
          </div>
        </section>

        {/* Top Tracks */}
        <section className="mt-16">
          <h2 className="text-xl font-display font-semibold mb-6">Trending Tracks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockTracks.slice(1, 5).map((track, i) => (
              <TrackCard key={track.id} track={track} rank={i + 2} />
            ))}
          </div>
        </section>

        {/* Top Artists */}
        <section className="mt-16">
          <h2 className="text-xl font-display font-semibold mb-6">Popular Artists</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {mockArtists.slice(0, 5).map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} rank={i + 1} variant="circle" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
