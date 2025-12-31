import { GenreChip } from '@/components/GenreChip';

export const GenreSection = ({ genres }: { genres: { name: string, percentage: number }[] }) => (
  <div className="bg-card rounded-xl p-5 border border-border/50">
    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Genres</h2>
    <div className="flex flex-wrap gap-2">
      {genres.map((genre, i) => (
        <GenreChip 
          key={genre.name} 
          genre={genre.name} 
          percentage={genre.percentage} 
          color={`hsl(${160 + i * 15} 60% 45%)`} 
          delay={i * 0.05} 
        />
      ))}
    </div>
  </div>
);