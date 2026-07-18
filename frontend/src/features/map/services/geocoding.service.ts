import axios from "axios";
import type { Coordinates } from "../types/map";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const USER_AGENT = "TripMindAI/1.0 (travel-planning-app)";

export interface GeocodingResult {
  placeId: number;
  displayName: string;
  name: string;
  country: string;
  countryCode: string;
  coordinates: Coordinates;
  boundingBox: [number, number, number, number];
  type: string;
  importance: number;
}

export async function geocodePlace(
  query: string,
  options?: {
    limit?: number;
    countrycodes?: string[];
    language?: string;
  }
): Promise<GeocodingResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: String(options?.limit ?? 8),
    addressdetails: "1",
    extratags: "1",
    ...(options?.countrycodes && {
      countrycodes: options.countrycodes.join(",")
    }),
    ...(options?.language && { "accept-language": options.language })
  });

  const res = await axios.get(`${NOMINATIM_BASE}/search?${params}`, {
    headers: { "User-Agent": USER_AGENT }
  });

  return (res.data as any[]).map(parseNominatimResult);
}

export async function reverseGeocode(
  coordinates: Coordinates
): Promise<GeocodingResult | null> {
  const params = new URLSearchParams({
    lat: String(coordinates.lat),
    lon: String(coordinates.lng),
    format: "json",
    addressdetails: "1"
  });

  try {
    const res = await axios.get(`${NOMINATIM_BASE}/reverse?${params}`, {
      headers: { "User-Agent": USER_AGENT }
    });

    const data = res.data;
    if (!data || data.error) return null;
    return parseNominatimResult(data);
  } catch (_) {
    return null;
  }
}

export async function lookupCountry(
  countryCode: string
): Promise<GeocodingResult | null> {
  const results = await geocodePlace(countryCode, { limit: 1 });
  return results[0] ?? null;
}

function parseNominatimResult(raw: any): GeocodingResult {
  const [south, north, west, east] = (raw.boundingbox ?? ["0", "0", "0", "0"]).map(
    Number
  );
  return {
    placeId: raw.place_id,
    displayName: raw.display_name ?? "",
    name: raw.name ?? raw.address?.city ?? raw.address?.country ?? raw.display_name,
    country: raw.address?.country ?? "",
    countryCode: (raw.address?.country_code ?? "").toUpperCase(),
    coordinates: {
      lat: parseFloat(raw.lat),
      lng: parseFloat(raw.lon)
    },
    boundingBox: [south, north, west, east],
    type: raw.type ?? raw.class ?? "place",
    importance: raw.importance ?? 0
  };
}
