import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

export interface GeocodingGeometry {
  type: string;
  coordinates: number[];
}

export interface GeocodingProperties {
  accurancy: string;
  mapbox_id: string;
}

export interface GeocodingContext {
  id: string;
  short_code: string;
  wikidata: string;
  mapbox_id: string;
  text: string;
}

export interface GeocodingFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: GeocodingProperties;
  text: string;
  place_name: string;
  center: number[];
  geometry: GeocodingGeometry;
  address: string;
  context: GeocodingContext[];
}

export interface Geocoding {
  type: string;
  query: string[];
  features: GeocodingFeature[];
}

@Service()
export default class MapboxService {
  private _geocodingUrl: string;
  private _accessToken: string | undefined;
  constructor() {
    this._geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
    this._accessToken = Deno.env.get('MAPBOX_ACCESS_TOKEN');
    if (!this._accessToken) {
      throw new Error("MAPBOX_ACCESS_TOKEN doesn't exist");
    }
  }

  public async requestGeocodingPlacesAsync(
    searchText: string,
    country: string
  ): Promise<Geocoding> {
    const geocodingResponse = await axiod.get(
      `${this._geocodingUrl}/mapbox.places/${searchText}.json?country=${country}&access_token=${this._accessToken}`
    );
    return geocodingResponse.data;
  }
}
