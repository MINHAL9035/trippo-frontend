export interface Photo {
  images: {
    original: {
      url: string;
    };
    small: {
      url: string;
    };
  };
}

export interface PlaceData {
  name: string;
  longitude: string;
  latitude: string;
  price: string;
  photo: Photo;
  rating: string;
  num_reviews: string;
  address: string;
  phone: string;
  distance_string: string;
}

export interface Trip {
  _id: string;
  tripName: string;
  destination: string;
  tripStartDate: string;
  tripEndDate: string;
  imageUrl: string;
}

export interface SavedPlace {
  _id: string;
  tripId: Trip;
  placeData: PlaceData;
}
