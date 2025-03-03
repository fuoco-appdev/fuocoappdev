import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';

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

export default class MapboxService extends Service {
  private _geocodingUrl: string;

  constructor(
    private readonly _accessToken: string,
    private readonly _configService: ConfigService,
    private readonly _logflareService: LogflareService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);

    this._geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
  }

  public override dispose(): void {}

  public async requestGeocodingPlacesAsync(
    searchText: string,
    language: string,
    types: string[]
  ): Promise<Geocoding> {
    const geocodingResponse = await fetch(
      `${this._geocodingUrl}/mapbox.places/${searchText}.json?&access_token=${
        this._accessToken
      }&language=${language}&types=${types.join(',')}`
    );
    return JSON.parse(await geocodingResponse.text());
  }

  public async requestReverseGeocodingPlacesAsync(
    geo: {
      lat: number;
      lng: number;
    },
    language: string,
    types: string[]
  ): Promise<Geocoding> {
    const geocodingResponse = await fetch(
      `${this._geocodingUrl}/mapbox.places/${geo.lng},${
        geo.lat
      }.json?&access_token=${
        this._accessToken
      }&language=${language}&types=${types.join(',')}`
    );
    return JSON.parse(await geocodingResponse.text());
  }
}
