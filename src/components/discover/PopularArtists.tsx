import { useQuery } from "@tanstack/react-query";
import { fetchSpotify } from "@/api/spotifyApi";
import { Artist } from "@/types/spotify";
import { mapSpotifyArtistToArtist } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ArtistCard } from "@/components/ArtistCard";

export const PopularArtists = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-artists"],
    queryFn: () => 
    fetchSpotify<any>("/search?q=genre:pop&type=artist&limit=20&market=US"),
  });

  if (isLoading) return <ArtistsSkeleton />;
  if (error) return null;

  const artists: Artist[] = data?.artists.items
    .map((a: any) => mapSpotifyArtistToArtist(a))
    .sort((a: Artist, b: Artist) => b.popularity - a.popularity)
    .slice(0, 5);

  return (
    <section>
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Popular Artists
      </h2>
      <div className="flex flex-wrap gap-6 justify-start">
        {artists.map((artist, i) => (
          <ArtistCard 
            key={artist.id} 
            artist={artist} 
            rank={i + 1} 
            variant="circle" 
          />
        ))}
      </div>
    </section>
  );
};

const ArtistsSkeleton = () => (
  <div className="flex flex-wrap gap-6">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex flex-col items-center gap-2">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="h-3 w-16" />
      </div>
    ))}
  </div>
);