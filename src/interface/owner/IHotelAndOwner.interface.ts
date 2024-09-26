import { HotelInterface } from "./IHotel.Interface";

export interface OwnerInterface {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
}

export interface HotelAndOwnerInterface {
  status: string;
  hotelId: HotelInterface;
  ownerId: OwnerInterface;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  mobileNumber?: string;
  hotelName?: string;
  roomType?: string;
  numberOfRooms?: string;
  streetAddress?: string;
  place?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  _id?: string | undefined;
}

export interface submitDetailsInterface {
  ownerId: string;
  hotelId: string | undefined;
}
