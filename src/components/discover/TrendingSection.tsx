import { useQuery } from "@tanstack/react-query";
import { fetchSpotify } from "@/api/spotifyApi";
import { TrackCard } from "@/components/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";
import { mapSpotifyTrackToTrack } from "@/lib/utils";

// Define the shape of a playlist tracks response
interface GlobalTopResponse {
  tracks: {
    items: {
      track: {
        id: string;
        name: string;
        album: {
          images: { url: string }[];
          name: string;
        };
        artists: { name: string }[];
        external_urls: { spotify: string };
      };
    }[];
  };
}

export const TrendingSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["global-trending"],
    queryFn: () => 
      // Fetching the "Global Top 50" Playlist
      fetchSpotify<GlobalTopResponse>("/playlists/3cEYpjA9oz9GiPac4AsH4n?fields=tracks.items(track(id,name,album(name,images),artists(name),external_urls))"),
  });

  if (isLoading) return <TrendingSkeleton />;
  if (error) return <p className="text-sm text-muted-foreground">Trending currently unavailable.</p>;

  // Filter out any null tracks and take the top 4
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
        <span className="text-xs text-primary font-medium">World Charts</span>
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