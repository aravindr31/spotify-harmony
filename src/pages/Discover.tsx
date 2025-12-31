import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, BarChart3, Compass, Clock, Disc, Users, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrackCard } from '@/components/TrackCard';
import { ArtistCard } from '@/components/ArtistCard';
import { StatCard } from '@/components/StatCard';
import { AudioFeatureBar, MoodPieChart, ListeningChart } from '@/components/Charts';
import { GenreChip } from '@/components/GenreChip';
import { mockTracks, mockArtists, mockListeningStats } from '@/data/mockSpotifyData';

type View = 'discover' | 'stats';

export default function Discover() {
  const [activeView, setActiveView] = useState<View>('discover');

  const formatMinutes = (mins: number) => {
    const hours = Math.floor(mins / 60);
    return hours > 0 ? `${hours.toLocaleString()}h` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Music className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">Resonance</span>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1.5 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full shadow-lg">
          <Button
            variant={activeView === 'discover' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('discover')}
            className="gap-2 rounded-full px-4"
          >
            <Compass className="w-4 h-4" />
            <span>Discover</span>
          </Button>
          <Button
            variant={activeView === 'stats' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('stats')}
            className="gap-2 rounded-full px-4"
          >
            <BarChart3 className="w-4 h-4" />
            <span>My Stats</span>
          </Button>
        </div>
      </div>

      <main className="relative z-10 container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeView === 'discover' ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12"
            >
              {/* Header */}
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Discover Music
                </h1>
                <p className="text-muted-foreground mt-1">Explore trending tracks and artists</p>
              </div>

              {/* Featured Track */}
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Featured</h2>
                <div className="max-w-lg">
                  <TrackCard track={mockTracks[0]} rank={1} variant="featured" />
                </div>
              </section>

              {/* Trending Tracks */}
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Trending</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockTracks.slice(1, 5).map((track, i) => (
                    <TrackCard key={track.id} track={track} rank={i + 2} />
                  ))}
                </div>
              </section>

              {/* Popular Artists */}
              <section>
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Popular Artists</h2>
                <div className="flex flex-wrap gap-6 justify-start">
                  {mockArtists.slice(0, 5).map((artist, i) => (
                    <ArtistCard key={artist.id} artist={artist} rank={i + 1} variant="circle" />
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Header */}
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Your Stats
                </h1>
                <p className="text-muted-foreground mt-1">Insights from your listening history</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard 
                  label="Minutes" 
                  value={formatMinutes(mockListeningStats.totalMinutes)} 
                  icon={<Clock className="w-4 h-4" />} 
                  gradient="primary" 
                  delay={0} 
                />
                <StatCard 
                  label="Tracks" 
                  value={mockListeningStats.totalTracks.toLocaleString()} 
                  icon={<Disc className="w-4 h-4" />} 
                  gradient="accent" 
                  delay={0.05} 
                />
                <StatCard 
                  label="Artists" 
                  value={mockListeningStats.totalArtists.toString()} 
                  icon={<Users className="w-4 h-4" />} 
                  gradient="cool" 
                  delay={0.1} 
                />
                <StatCard 
                  label="Top Genre" 
                  value="Electronic" 
                  icon={<Headphones className="w-4 h-4" />} 
                  gradient="warm" 
                  delay={0.15} 
                />
              </div>

              {/* Top Tracks & Artists */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-5 border border-border/50">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Tracks</h2>
                  <div className="space-y-1">
                    {mockTracks.slice(0, 5).map((track, i) => (
                      <TrackCard key={track.id} track={track} rank={i + 1} variant="compact" />
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-5 border border-border/50">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Artists</h2>
                  <div className="space-y-1">
                    {mockArtists.slice(0, 5).map((artist, i) => (
                      <ArtistCard key={artist.id} artist={artist} rank={i + 1} variant="compact" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="bg-card rounded-xl p-5 border border-border/50">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {mockListeningStats.topGenres.map((genre, i) => (
                    <GenreChip 
                      key={genre.name} 
                      genre={genre.name} 
                      percentage={genre.percentage} 
                      color={`hsl(${160 + i * 15} 60% 45%)`} 
                      delay={i * 0.05} 
                    />
                  ))}
                </div>
              </div>

              {/* Mood & Audio Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-5 border border-border/50">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Mood Profile</h2>
                  <MoodPieChart data={mockListeningStats.moodAnalysis} />
                </div>
                <div className="bg-card rounded-xl p-5 border border-border/50">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Audio Features</h2>
                  <div className="space-y-3">
                    {Object.entries(mockListeningStats.audioFeatures).map(([key, value], i) => (
                      <AudioFeatureBar key={key} label={key} value={value} delay={i * 0.05} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Listening by Day */}
              <div className="bg-card rounded-xl p-5 border border-border/50">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Weekly Activity</h2>
                <ListeningChart data={mockListeningStats.listeningByDay.map(d => ({ label: d.day, value: d.minutes }))} />
                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                  {mockListeningStats.listeningByDay.map(d => <span key={d.day}>{d.day}</span>)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
