export interface Hotel {
  _id: string;
  ownerId: string;
  hotelName: string;
  roomType: string;
  numberOfRooms: string;
  streetAddress: string;
  place: string;
  state: string;
  country: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  verified: boolean;
  is_blocked: boolean;
  isGoogle: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingDetails {
  _id: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number[];
  hotelId: Hotel;
  userId: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
}
