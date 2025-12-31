import { useQuery } from "@tanstack/react-query";
import { fetchSpotify } from "@/api/spotifyApi";
import { fetchAudioFeatures } from "@/api/reccobeatsApi";
import { mapSpotifyTrackToTrack, mapSpotifyArtistToArtist } from "@/lib/utils";

export const useSpotifyStats = (timeRange: string = 'medium_term') => {
  return useQuery({
    queryKey: ["personal-stats", timeRange],
    queryFn: async () => {

      const [tracksData, artistsData] = await Promise.all([
        fetchSpotify<any>(`/me/top/tracks?time_range=${timeRange}&limit=40`),
        fetchSpotify<any>(`/me/top/artists?time_range=${timeRange}&limit=20`),
      ]);

      const tracks = tracksData.items.map(mapSpotifyTrackToTrack);
      const artists = artistsData.items.map(mapSpotifyArtistToArtist);
      const trackIds = tracksData.items.map((t: any) => t.id);

      let audioFeatures = { Energy: 0, Danceability: 0, Valence: 0, Acousticness: 0, Instrumentalness: 0 };
      
      try {
        const data = await fetchAudioFeatures(trackIds);
        const content = data.content || [];

        if (content.length > 0) {
          const getAvg = (key: string) => {
            const sum = content.reduce((acc: number, f: any) => acc + (f[key] || 0), 0);
            return (sum / content.length); 
          };

          audioFeatures = {
            Energy: getAvg('energy'),
            Danceability: getAvg('danceability'),
            Valence: getAvg('valence'),
            Acousticness: getAvg('acousticness'),
            Instrumentalness: getAvg('instrumentalness'),
          };
        }
      } catch (e) {
        console.error("Audio features skipped:", e instanceof Error && e.message === "RATE_LIMIT" ? "Rate Limited" : e);
      }

      const moodAnalysis = [
        { mood: 'Happy', percentage: Math.round(audioFeatures.Valence * 100), color: '#fde047' },
        { mood: 'Energetic', percentage: Math.round(audioFeatures.Energy * 100), color: '#ef4444' },
        { mood: 'Chill', percentage: Math.round((1 - audioFeatures.Energy) * 100), color: '#60a5fa' },
        { mood: 'Dark', percentage: Math.round((1 - audioFeatures.Valence) * 100), color: '#475569' },
      ].filter(m => m.percentage > 5); 

      // 4. Genre Logic
      const genreCounts: Record<string, number> = {};
      artistsData.items.forEach((a: any) => a.genres.forEach((g: string) => genreCounts[g] = (genreCounts[g] || 0) + 1));
      const topGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({ 
          name, 
          percentage: Math.round((count / (artists.length || 1)) * 100) 
        }));

      return { 
        tracks, 
        artists, 
        audioFeatures, 
        moodAnalysis, 
        topGenres,
        topGenreName: topGenres[0]?.name || 'Music'
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};