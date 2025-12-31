export interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  followers: number;
  popularity: number;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  albumImage: string;
  duration: number;
  previewUrl: string | null;
  popularity: number;
  addedAt?: string;
}

// src/types/spotify.ts
export interface Album {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
  album_type: string;
  
}

export interface ListeningStats {
  totalMinutes: number;
  totalTracks: number;
  totalArtists: number;
  topGenres: { name: string; count: number; percentage: number }[];
  listeningByHour: { hour: number; minutes: number }[];
  listeningByDay: { day: string; minutes: number }[];
  moodAnalysis: { mood: string; percentage: number; color: string }[];
  audioFeatures: {
    energy: number;
    danceability: number;
    valence: number;
    acousticness: number;
    instrumentalness: number;
  };
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  country: string;
  followers: number;
  subscription: 'free' | 'premium';
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  artists: { name: string }[];
  external_urls: { spotify: string };
  release_date: string;
}

export interface NewReleasesResponse {
  albums: {
    items: SpotifyAlbum[];
  };
}

export interface GlobalTopResponse {
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