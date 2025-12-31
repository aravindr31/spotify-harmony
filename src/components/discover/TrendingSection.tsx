import { useQuery } from "@tanstack/react-query";
import { fetchSpotify } from "@/api/spotifyApi";
import { TrackCard } from "@/components/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";
import { mapSpotifyTrackToTrack } from "@/lib/utils";
import { GlobalTopResponse } from "@/types/spotify";

export const TrendingSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["global-trending"],
    queryFn: () => 
      fetchSpotify<GlobalTopResponse>("/playlists/3cEYpjA9oz9GiPac4AsH4n?fields=tracks.items(track(id,name,album(name,images),artists(name),external_urls))"),
  });

  if (isLoading) return <TrendingSkeleton />;
  if (error) return <p className="text-sm text-muted-foreground">Trending currently unavailable.</p>;

const tracks = data?.tracks.items
    .filter((item: any) => item.track !== null)
    .map((item: any) => mapSpotifyTrackToTrack(item.track))
    .slice(0, 4);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Global Trending
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tracks?.map((track, i) => (
          <TrackCard 
            key={track.id} 
            track={track} 
            rank={i + 1} 
          />
        ))}
      </div>
    </section>
  );
};

const TrendingSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <Skeleton key={i} className="h-32 w-full rounded-xl" />
    ))}
  </div>
);