export interface CreateTrip {
  tripName: string;
  destination: string;
  tripImage?: File | null;
  tripDate: [string, string] | null;
}
export interface CreateTripResponse {
  _id?: string;
  tripName: string | undefined;
  destination?: string | undefined;
  imageUrl?: string | undefined;
  tripStartDate?: string | undefined;
  tripEndDate?: string | undefined;
  tripId?: string;
  userId: string;
}
