import { motion } from 'framer-motion';
import { useSpotifyStats } from '@/hooks/useSpotifyStats';
import { StatGrid } from './StatsGrid';
import { TopItems } from './TopItems';
import { GenreSection } from './sections/GenreSection';
import { MoodAudioSection } from './sections/MoodAudioSection';
import { ActivitySection } from './sections/ActivitySection';

export const StatsView = () => {
  const { data, isLoading, error } = useSpotifyStats('medium_term');

  if (isLoading) return <div className="p-8 text-center">Analysing your music taste...</div>;
  if (error) return <div className="p-8 text-center text-red-400">Failed to load stats.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Your Stats</h1>
        <p className="text-muted-foreground mt-1">Insights from your listening history</p>
      </header>
      <StatGrid data={data} />
      
      <TopItems tracks={data.tracks} artists={data.artists} />

      <GenreSection genres={data.topGenres} />

      <MoodAudioSection mood={data.moodAnalysis} features={data.audioFeatures} />

      <ActivitySection />
    </motion.div>
  );
};