export interface Place {
  id: string;
  name: string;
  place_formatted: string;
}

export interface Properties {
  name: string;
  place_formatted: string;
}

export interface Feature {
  id: string;
  properties: Properties;
}

export interface MapboxResponse {
  features: Feature[];
}
