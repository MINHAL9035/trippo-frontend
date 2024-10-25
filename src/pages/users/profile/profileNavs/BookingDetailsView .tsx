import { BookingDetails } from "@/interface/user/ICompletedBooking";
import { ArrowLeft, Hotel, MapPin, Calendar, Users } from "lucide-react";

export interface BookingDetailsViewProps {
  booking: BookingDetails;
  onBack: () => void;
}

const BookingDetailsView: React.FC<BookingDetailsViewProps> = ({
  booking,
  onBack,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!booking) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bookings
      </button>

      <div className="rounded-lg border p-6 space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Hotel className="w-10 h-10 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              {booking.hotelId.hotelName}
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <p>{booking.hotelId.place}</p>
            </div>
          </div>
          <div className="bg-yellow-50 px-4 py-2 rounded-lg">
            <p className="text-yellow-600 font-medium">
              Booking ID: {booking.bookingId}
            </p>
          </div>
        </div>

        {/* Stay Details */}
        <div className="grid grid-cols-2 gap-6 border-t border-b py-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Stay Details</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium">{formatDate(booking.checkIn)}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium">{formatDate(booking.checkOut)}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Guest Information</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Guest Name</p>
                  <p className="font-medium">{booking.userId.fullName}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsView;
