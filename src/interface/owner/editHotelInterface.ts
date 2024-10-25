// import { HotelInterface } from "./IHotel.Interface";

import { HotelInterface } from "./IHotel.Interface";

// export interface HotelImage {
//   file: File | null;
//   preview: string;
// }

// export interface Room {
//   type: string;
//   rate: number;
//   capacity: number;
//   available: number;
//   amenities: string[];
//   availableDates: [Date | null, Date | null];
// }

// export interface HotelFormValues {
//   images: HotelImage[];
//   hotelType: string;
//   amenities: string[];
//   rooms: Room[];
// }

// export interface HotelInformationFormProps {
//   setStep: React.Dispatch<React.SetStateAction<number>>;
//   hotelId: string;
//   hotelDetails: HotelInterface | null;
// }



export interface ImageType {
  file: File | null;
  preview: string;
  isExisting?: boolean;
}

export interface RoomType {
  type: string;
  rate: number;
  capacity: number;
  available: number;
  amenities: string[];
  availableDates: [Date | null, Date | null];
}

export interface HotelFormValues {
  images: ImageType[];
  hotelType: string;
  amenities: string[];
  rooms: RoomType[];
}

export interface HotelDetails {
  images?: string[];
  hotelType?: string;
  amenities?: string[];
  rooms?: {
    type?: string;
    rate?: number;
    capacity?: number;
    available?: number;
    amenities?: string[];
    availableDates?: [string | null, string | null];
  }[];
}

export interface HotelInformationFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hotelId: string;
  hotelDetails: HotelInterface | null;
}

export interface ImageSectionProps {
  images: ImageType[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
}

export interface HotelDetailsSectionProps {
  values: HotelFormValues;
}

export interface RoomSectionProps {
  values: HotelFormValues;
  setFieldValue: (field: string, value: any) => void;
}

export interface RoomFieldsGroupProps {
  index: number;
  room: RoomType;
  setFieldValue: (field: string, value: any) => void;
}

export interface RoomAmenitiesSectionProps {
  index: number;
  room: RoomType;
}