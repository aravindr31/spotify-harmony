import { TrackCard } from '@/components/TrackCard';
import { ArtistCard } from '@/components/ArtistCard';

export const TopItems = ({ tracks, artists }: { tracks: any[], artists: any[] }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="bg-card rounded-xl p-6 border border-border/50">
      <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
        Top Tracks
      </h2>
      <div className="space-y-1">
        {tracks.slice(0, 5).map((track, i) => (
          <TrackCard key={track.id} track={track} rank={i + 1} variant="compact" />
        ))}
      </div>
    </div>
    
    <div className="bg-card rounded-xl p-6 border border-border/50">
      <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
        Top Artists
      </h2>
      <div className="space-y-1">
        {artists.slice(0, 5).map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} rank={i + 1} variant="compact" />
        ))}
      </div>
    </div>
  </div>
);