import { useQuery } from "@tanstack/react-query";
import { fetchSpotify } from "@/api/spotifyApi";
import { ListeningChart } from '@/components/Charts';

export const ActivitySection = () => {
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const response = await fetchSpotify<any>("/me/player/recently-played?limit=50");
      
      // Grouping logic
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const counts: Record<string, number> = { 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0 };

      response.items.forEach((item: any) => {
        const dayName = days[new Date(item.played_at).getDay()];
        counts[dayName] += 1;
      });

      return Object.entries(counts).map(([label, value]) => ({ label, value }));
    }
  });

  if (isLoading) return <div className="h-40 bg-card animate-pulse rounded-xl" />;

  return (
    <div className="bg-card rounded-xl p-5 border border-border/50">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Recent Activity (Last 50 Tracks)
      </h2>
      <ListeningChart data={activityData || []} />
      <div className="flex justify-between mt-3 text-xs text-muted-foreground px-2">
        {activityData?.map(d => <span key={d.label}>{d.label}</span>)}
      </div>
    </div>
  );
};