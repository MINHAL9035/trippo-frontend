import { Owner } from "./IOwner.interface";
interface Room {
  roomId:string
  type: string;
  rate: number;
  capacity: number;
  available: number;
  amenities: string[];
  availableDates: string[];
  _id: string;
}
export class HotelInterface {
  hotelName?: string;
  streetAddress?: string;
  place?: string;
  state?: string;
  country?: string;
  description?: string;
  ownerId?: Owner | undefined;
  _id?: string;
  amenities?: string[];
  images?: string[];
  rooms?: Room[];
  hotelType?: string;
  availableRooms: Room[] | undefined;
}
