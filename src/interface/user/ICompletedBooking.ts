interface Room {
  roomId: string;
  type: string;
  rate: number;
  capacity: number;
  available: number;
  amenities: string[];
  availableDates: string[];
  _id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  rooms: Room[];
  description: string;
  hotelType: string;
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
  __v: number;
}

export interface BookingDetails {
  totalPrice: number;
  rooms: number;
  _id: string;
  bookingId: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  hotelId: Hotel;
  roomId: string;
  userId: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
