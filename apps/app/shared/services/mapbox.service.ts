import axios from 'axios';
import { Service } from '../service';

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

class MapboxService extends Service {
  private _geocodingUrl: string;
  private _accessToken: string | undefined;

  constructor() {
    super();

    this._geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
    this._accessToken = import.meta.env['MAPBOX_ACCESS_TOKEN'] ?? '';
  }

  public async requestGeocodingPlacesAsync(
    searchText: string,
    language: string,
    types: string[]
  ): Promise<Geocoding> {
    const geocodingResponse = await axios.get(
      `${this._geocodingUrl}/mapbox.places/${searchText}.json?&access_token=${
        this._accessToken
      }&language=${language}&types=${types.join(',')}`
    );
    return geocodingResponse.data;
  }

  public async requestReverseGeocodingPlacesAsync(
    geo: {
      lat: number;
      lng: number;
    },
    language: string,
    types: string[]
  ): Promise<Geocoding> {
    const geocodingResponse = await axios.get(
      `${this._geocodingUrl}/mapbox.places/${geo.lng},${
        geo.lat
      }.json?&access_token=${
        this._accessToken
      }&language=${language}&types=${types.join(',')}`
    );
    return geocodingResponse.data;
  }
}

export default new MapboxService();
