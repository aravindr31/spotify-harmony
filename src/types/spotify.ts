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

export interface Album {
  id: string;
  name: string;
  artist: string;
  image: string;
  releaseDate: string;
  totalTracks: number;
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
