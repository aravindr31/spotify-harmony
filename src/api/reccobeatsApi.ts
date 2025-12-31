// src/api/reccobeatsApi.ts
const REC_BASE_URL = 'https://api.reccobeats.com/v1';

export const fetchAudioFeatures = async (ids: string[]) => {
  if (!ids || ids.length === 0) return { content: [] };

  const batch = ids.slice(0, 40).join(',');
  const url = `${REC_BASE_URL}/audio-features?ids=${batch}`;

  const response = await fetch(url);
  
  if (response.status === 429) {
    throw new Error("RATE_LIMIT");
  }

  if (!response.ok) throw new Error("Reccobeats fetch failed");

  return await response.json();
};