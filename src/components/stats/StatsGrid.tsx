import { Headphones, Disc, Users, Zap } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

export const StatGrid = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <StatCard 
        label="Vibe Score" 
        value={`${Math.round(data?.audioFeatures?.Energy * 100)}%`} 
        icon={<Zap className="w-4 h-4" />} 
        gradient="primary" 
      />
      <StatCard 
        label="Top Tracks" 
        value={data?.tracks?.length || 0} 
        icon={<Disc className="w-4 h-4" />} 
        gradient="accent" 
      />
      <StatCard 
        label="Artists" 
        value={data?.artists?.length || 0} 
        icon={<Users className="w-4 h-4" />} 
        gradient="cool" 
      />
      <StatCard 
        label="Top Genre" 
        value={data?.topGenres[0]?.name} 
        icon={<Headphones className="w-4 h-4" />} 
        gradient="warm" 
      />
    </div>
  );
};