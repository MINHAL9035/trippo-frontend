interface HotelOption {
    hotelName: string;
    hotelAddress: string;
    price: string;
    rating: number;
  }
  
  interface UserInput {
    place: string;
    days: number;
    budget: string;
  }
  
  interface TripData {
    hotelOptions: HotelOption[];
    itinerary: Itinerary;
  }
  
  interface Place {
    placeName?: string;
    placeDetails: string;
    placeImageUrl?: string;
    geoCoordinates?: string;
    ticketPricing: string;
    time: string;
  }
  
  interface DaySchedule {
    [key: string]: Place; // Add index signature for timeOfDay access
    morning: Place;
    afternoon: Place;
    evening: Place;
  }
  
  interface Itinerary {
    [key: string]: DaySchedule;
    day1: DaySchedule;
    day2: DaySchedule;
    day3: DaySchedule;
    day4: DaySchedule;
  }
  
  export interface Trip {
    tripData: TripData;
    userInput: UserInput;
  }
  