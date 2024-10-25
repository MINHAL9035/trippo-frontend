import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { IBookingDetails } from "@/interface/user/IBookingInterface";

interface BookingHeaderProps {
  bookingDetails: IBookingDetails;
}

const BookingHeader = ({ bookingDetails }: BookingHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <CardHeader className="border-b border-gray-200 bg-white rounded-t-xl px-6 py-5">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Booking Details
          </CardTitle>
          <p className="text-gray-500 mt-1 text-sm">
            Booking ID: <span className="font-medium">{bookingDetails.bookingId}</span>
          </p>
        </div>
        <Badge
          className={`${getStatusColor(
            bookingDetails.status
          )} px-4 py-2 text-sm capitalize font-semibold shadow-sm`}
        >
          {bookingDetails.status}
        </Badge>
      </div>
    </CardHeader>
  );
};

export default BookingHeader;