import { useQuery } from "@tanstack/react-query";
import { fetchSpotify } from "@/api/spotifyApi";
import { NewReleasesResponse } from "@/types/spotify";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

export const FeaturedSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["new-releases"],
    queryFn: () => fetchSpotify<NewReleasesResponse>("/browse/new-releases?limit=1"),
  });

  if (isLoading) return <FeaturedSkeleton />;
    if (error) {
        return (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            <p className="font-bold">Failed to load:</p>
            <p>{(error as Error).message}</p>
            <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => window.location.reload()}
            >
            Try Again
            </Button>
        </div>
        );
    }

  return (
    <section>
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        New Releases
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.albums.items.map((album) => (
          <div 
            key={album.id} 
            className="group relative aspect-square overflow-hidden rounded-xl border border-border/50 bg-card cursor-pointer"
            onClick={() => window.open(album.external_urls.spotify, '_blank')}
          >
            <img 
              src={album.images[0]?.url} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={album.name}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <h3 className="font-bold text-white text-lg leading-tight group-hover:text-primary transition-colors">
                {album.name}
              </h3>
              <p className="text-sm text-gray-300">
                {album.artists.map(a => a.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturedSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="aspect-square w-full rounded-xl" />
      </div>
    ))}
  </div>
);