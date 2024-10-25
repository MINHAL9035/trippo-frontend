import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { IBookingDetails } from "@/interface/user/IBookingInterface";

interface BookingCardProps {
  booking: IBookingDetails;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="mb-4 p-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Booking ID:</span>
          <span>{booking._id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Guest Name:</span>
          <span>{booking.userId.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Check-in:</span>
          <span> {formatDate(booking.checkIn)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Check-out:</span>
          <span> {formatDate(booking.checkOut)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Room Type:</span>
          <span>
            {booking.hotelId.rooms.find(
              (room) => room.roomId === booking.roomId
            )?.type || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Booking Date:</span>
          <span> {formatDate(booking.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              booking.status === "completed"
                ? "bg-green-100 text-green-800"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-800"
                : booking.status === "confirmed"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {booking.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span>10000</span>
        </div>
        <button className="w-full mt-2 text-green-600 hover:text-green-900 flex items-center justify-center">
          <Eye size={16} className="mr-1" />
          View Details
        </button>
      </div>
    </Card>
  );
};

export default BookingCard;
