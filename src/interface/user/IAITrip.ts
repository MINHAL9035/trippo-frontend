export interface IAiTrip {
  trip_name: string;
  duration: number;
  destination: string;
  travelers: number;
  budget: string;
  season: string;
  hotel_options: HotelOption[];
  local_transportation: LocalTransportation[];
  itinerary: ItineraryDay[];
  budget_friendly_restaurants: Restaurant[];
  tips: Tip[];
}

export interface HotelOption {
  name: string;
  address: string;
  price: string;
  image_url: string;
  geo_coordinates: string;
  rating: string;
  description: string;
}

export interface LocalTransportation {
  mode: string;
  description: string;
  website?: string;
  cost: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
}

export interface Activity {
  name: string;
  description: string;
  image_url: string;
  geo_coordinates: string;
  ticket_pricing: string;
  rating: string;
  estimated_duration: string;
  best_time_to_visit: string;
}

export interface Transportation {
  mode: string;
  from: string;
  to: string;
  time: string;
}

export interface Restaurant {
  name: string;
  cuisine:string
  description: string;
}

export interface Tip{
  tip:string
  description:string
}