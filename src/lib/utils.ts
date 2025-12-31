import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Track } from '@/types/spotify';
import { Artist } from '@/types/spotify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapSpotifyTrackToTrack = (spotifyTrack: any): Track => {
  return {
    id: spotifyTrack.id,
    name: spotifyTrack.name,
    artist: spotifyTrack.artists.map((a: any) => a.name).join(', '),
    artistId: spotifyTrack.artists[0]?.id || '',
    album: spotifyTrack.album.name,
    albumImage: spotifyTrack.album.images[0]?.url || '',
    duration: spotifyTrack.duration_ms,
    previewUrl: spotifyTrack.preview_url || null,
    popularity: spotifyTrack.popularity || 0,
  };
};


export const mapSpotifyArtistToArtist = (spotifyArtist: any): Artist => {
  if (!spotifyArtist) throw new Error("Artist object is undefined");
  return {
    id: spotifyArtist.id,
    name: spotifyArtist.name,
    image: spotifyArtist.images?.[0]?.url || 'https://via.placeholder.com/300',
    genres: spotifyArtist.genres || [],
    followers: spotifyArtist.followers?.total || 0,
    popularity: spotifyArtist.popularity || 0,
  };
};