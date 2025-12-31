const BASE_URL = 'https://api.spotify.com/v1';

export const fetchSpotify = async <T>(endpoint: string): Promise<T> => {
  const token = localStorage.getItem('spotify_access_token');

  if (!token) {
    // If no token, we can't make the request. 
    // You might want to redirect to login here.
    throw new Error("No access token found. Please log in.");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
//   console.log('Spotify API Response Status:', await response.json());
  // Handle Token Expiration (401 Unauthorized)
  if (response.status === 401) {
    console.warn("Token expired. Clearing storage and refreshing...");
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    window.location.href = '/'; // Send user back to login
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error?.message || "Failed to fetch from Spotify");
  }

  return response.json() as Promise<T>;
};