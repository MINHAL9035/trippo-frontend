import React from "react";
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Hotel,
  MapPin,
  Users,
  Clock,
  BadgeDollarSign,
} from "lucide-react";
import { Button, message, Popconfirm } from "antd";
import type { PopconfirmProps } from "antd";
import { cancelBooking } from "@/service/api/userProfileApi";
import { CancellationPolicy } from "./CancellationPolicy";

export interface Booking {
  _id: string;
  bookingId: string;
  totalPrice: number;
  rooms: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  hotelId: {
    hotelName: string;
    place: string;
    state: string;
    hotelType: string;
  };
  userId: {
    fullName: string;
  };
}

export interface CompletedBookingsProps {
  onViewDetails: (bookingId: string) => void;
  bookings: Booking[];
  onBookingCancelled: () => void;
}

const Completed: React.FC<CompletedBookingsProps> = ({
  bookings,
  onViewDetails,
  onBookingCancelled,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleConfirmCancel = async (e?: React.MouseEvent<HTMLElement>) => {
    if (e) {
      const bookingId = e.currentTarget.getAttribute("data-booking-id");
      console.log("hi", bookingId);

      if (bookingId) {
        const response = await cancelBooking(bookingId);
        if (response?.status === 201) {
          message.success("Booking cancellation initiated");
          onBookingCancelled();
        }
      }
    }
  };

  const handleCancelPopup: PopconfirmProps["onCancel"] = () => {
    message.error("Cancellation cancelled");
  };

  return (
    <>
      {bookings && bookings.length > 0 ? (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-white rounded-lg border hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 flex-1">
                    <div className="w-16 h-16 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Hotel className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {booking.hotelId.hotelName}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-500 mt-1">
                              <MapPin className="w-4 h-4" />
                              <p className="text-sm">
                                {booking.hotelId.place}, {booking.hotelId.state}
                              </p>
                            </div>
                          </div>
                          <div className="bg-yellow-50 px-3 py-1 rounded-md">
                            <p className="text-yellow-700 text-sm font-medium">
                              {booking.hotelId.hotelType}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p className="font-medium">
                              {formatDate(booking.checkIn)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p className="font-medium">
                              {formatDate(booking.checkOut)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium">
                              {booking.nights}{" "}
                              {booking.nights === 1 ? "night" : "nights"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <BadgeDollarSign className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Total Price</p>
                            <p className="font-medium">
                              ₹{booking.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Guest Name</p>
                            <p className="font-medium">
                              {booking.userId.fullName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Booking ID</p>
                            <p className="font-medium">{booking.bookingId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <CancellationPolicy />
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="flex gap-2">
                            <Popconfirm
                              title="Cancel Booking"
                              description="Are you sure you want to cancel this booking? This action cannot be undone."
                              onConfirm={handleConfirmCancel}
                              onCancel={handleCancelPopup}
                              okText="Yes, Cancel"
                              cancelText="No, Keep it"
                              okButtonProps={{
                                danger: true,
                                "data-booking-id": booking.bookingId,
                              }}
                            >
                              <Button danger>Cancel Booking</Button>
                            </Popconfirm>
                          </div>
                          <button
                            onClick={() => onViewDetails(booking.bookingId)}
                            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-lg"
                          >
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
          <Hotel className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            No Completed Bookings Yet
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Your completed bookings will appear here once you've finished a
            trip. Start exploring hotels to begin your journey!
          </p>
        </div>
      )}
    </>
  );
};

export default Completed;
