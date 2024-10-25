interface Room {
  type: string;
  rate: number;
  capacity: number;
  available: number;
  amenities: string[];
  availableDates: string[];
  _id: string;
  roomId: string;
}

interface Hotel {
  _id: string;
  ownerId: string;
  hotelName: string;
  streetAddress: string;
  place: string;
  state: string;
  country: string;
  isVerified: boolean;
  images: string[];
  amenities: string[];
  rooms: Room[];
  description: string;
  hotelType: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  image: string;
  verified: boolean;
  is_blocked: boolean;
  isGoogle: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBookingDetails {
  nights: number;
  _id: string;
  userId: User;
  hotelId: Hotel;
  checkIn: string;
  checkOut: string;
  roomId: string;
  status: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  roomRate: number;
  rooms: number;
  totalPrice: number;
}

export interface BookingsState {
  all: IBookingDetails[];
  completed: IBookingDetails[];
  cancelled: IBookingDetails[];
  [key: string]: IBookingDetails[];
}
