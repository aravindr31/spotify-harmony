import { AudioFeatureBar, MoodPieChart } from "@/components/Charts";

const COLORS: Record<string, string> = {
  Energy: '#ef4444',
  Danceability: '#8b5cf6',
  Valence: '#10b981',
  Acousticness: '#f59e0b',
  Instrumentalness: '#3b82f6'
};

export const MoodAudioSection = ({ mood, features }: { mood: any[], features: any }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <MoodPieChart data={mood} />
    <div className="space-y-4">
      {Object.entries(features).map(([key, value], i) => (
        <AudioFeatureBar 
          key={key} 
          label={key} 
          value={(value as number) * 100}
          color={COLORS[key]} 
          delay={i * 0.1} 
        />
      ))}
    </div>
  </div>
);