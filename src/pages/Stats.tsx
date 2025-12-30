import { motion } from 'framer-motion';
import { Music, ArrowLeft, Clock, Disc, Users, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { TrackCard } from '@/components/TrackCard';
import { ArtistCard } from '@/components/ArtistCard';
import { AudioFeatureBar, MoodPieChart, ListeningChart } from '@/components/Charts';
import { GenreChip } from '@/components/GenreChip';
import { mockTracks, mockArtists, mockListeningStats } from '@/data/mockSpotifyData';

export default function Stats() {
  const formatMinutes = (mins: number) => {
    const hours = Math.floor(mins / 60);
    return hours > 0 ? `${hours.toLocaleString()}h` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-neon-pink/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[150px]" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Music className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">Your Stats</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12 space-y-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Your <span className="text-gradient-accent">Listening</span> Stats
          </h1>
          <p className="text-muted-foreground mt-2">Insights from your music journey</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Minutes Listened" value={formatMinutes(mockListeningStats.totalMinutes)} icon={<Clock className="w-5 h-5 text-primary-foreground" />} gradient="primary" delay={0} />
          <StatCard label="Tracks Played" value={mockListeningStats.totalTracks.toLocaleString()} icon={<Disc className="w-5 h-5 text-primary-foreground" />} gradient="accent" delay={0.1} />
          <StatCard label="Artists" value={mockListeningStats.totalArtists} icon={<Users className="w-5 h-5 text-primary-foreground" />} gradient="cool" delay={0.2} />
          <StatCard label="Top Genre" value="Electronic" icon={<Headphones className="w-5 h-5 text-primary-foreground" />} gradient="warm" delay={0.3} />
        </div>

        {/* Top Tracks & Artists */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6 border border-border/50">
            <h2 className="text-xl font-display font-semibold mb-4">Top Tracks</h2>
            <div className="space-y-1">
              {mockTracks.slice(0, 5).map((track, i) => (
                <TrackCard key={track.id} track={track} rank={i + 1} variant="compact" />
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 border border-border/50">
            <h2 className="text-xl font-display font-semibold mb-4">Top Artists</h2>
            <div className="space-y-1">
              {mockArtists.slice(0, 5).map((artist, i) => (
                <ArtistCard key={artist.id} artist={artist} rank={i + 1} variant="compact" />
              ))}
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="glass rounded-2xl p-6 border border-border/50">
          <h2 className="text-xl font-display font-semibold mb-4">Your Top Genres</h2>
          <div className="flex flex-wrap gap-2">
            {mockListeningStats.topGenres.map((genre, i) => (
              <GenreChip key={genre.name} genre={genre.name} percentage={genre.percentage} color={`hsl(${280 - i * 30} 100% 65%)`} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Mood & Audio Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6 border border-border/50">
            <h2 className="text-xl font-display font-semibold mb-6">Your Mood Profile</h2>
            <MoodPieChart data={mockListeningStats.moodAnalysis} />
          </div>
          <div className="glass rounded-2xl p-6 border border-border/50">
            <h2 className="text-xl font-display font-semibold mb-6">Audio Features</h2>
            <div className="space-y-4">
              {Object.entries(mockListeningStats.audioFeatures).map(([key, value], i) => (
                <AudioFeatureBar key={key} label={key} value={value} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* Listening by Day */}
        <div className="glass rounded-2xl p-6 border border-border/50">
          <h2 className="text-xl font-display font-semibold mb-6">Listening by Day</h2>
          <ListeningChart data={mockListeningStats.listeningByDay.map(d => ({ label: d.day, value: d.minutes }))} />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {mockListeningStats.listeningByDay.map(d => <span key={d.day}>{d.day}</span>)}
          </div>
        </div>
      </main>
    </div>
  );
}
