export type Coordinates = {
  lat: number;
  lng: number;
};

export type Bounds = {
  ne: Coordinates;
  sw: Coordinates;
};

interface ImageDetails {
  url: string;
}

interface Photo {
  images: {
    thumbnail: ImageDetails;
    medium: ImageDetails;
  };
}

interface WeekRange {
  open_time: number;
  close_time: number;
}

interface Hours {
  week_ranges: WeekRange[][];
  timezone: string;
}

interface Cuisine {
  key: string;
  name: string;
}

export interface IExplorePlaces {
  longitude: number;
  latitude: number;
  price: string;
  name: string;
  photo: Photo;
  hours: Hours;
  cuisine: Cuisine[];
  rating: string;
  num_reviews: string;
  is_closed: boolean;
  open_now_text: string;
  address: string;
  phone: string;
  distance_string: string;
  ranking: string;
}

interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  image: string;
}

export interface IExploreTrip {
  _id: string;
  userId: User;
  tripName: string;
  destination: string;
  tripStartDate: string;
  tripEndDate: string;
  imageUrl: string;
}
