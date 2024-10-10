import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import {
  Calendar,
  Users,
  Home,
  CreditCard,
  Clock,
  MapPin,
  Tag,
  CheckCircle,
} from "lucide-react";
import { getBookingDetails } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { IBookingDetails } from "@/interface/user/IBookingInterface";

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState<IBookingDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { bookingId } = useParams();

  useEffect(() => {
    const fetchBooking = async (id: string) => {
      try {
        const response = await getBookingDetails(id);

        if (response.status === 200) {
          setBookingDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (bookingId) {
      fetchBooking(bookingId);
    }
  }, [bookingId]);

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await loadStripe(
      "pk_test_51Q3EDJ045cVLbfg4r3Rt3CIACoeazX1GZAqJDNGLAgZ0rHoCwilXuLXTTqo1jnVt44XPCAxAAC8GJ5WiuzgPTUbc00xFHRGohX"
    );

    if (!bookingDetails) return;

    const checkInDate = new Date(bookingDetails.checkIn);
    const checkOutDate = new Date(bookingDetails.checkOut);

    const totalNights = differenceInCalendarDays(checkOutDate, checkInDate);

    const bookedRoom = bookingDetails.hotelId.rooms.find(
      (room) => room.roomId === bookingDetails.roomId
    );
    const roomRate = bookedRoom ? bookedRoom.rate : 0;
    const subtotal = roomRate * totalNights;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const body = {
      bookingId: bookingDetails._id,
      amount: Math.round(total * 100),
      currency: "inr",
    };

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${BASE_URL}/payment/checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const session = await response.json();
      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        console.error("Stripe failed to load");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const checkInDate = new Date(bookingDetails.checkIn);
  const checkOutDate = new Date(bookingDetails.checkOut);
  const totalNights = differenceInCalendarDays(checkOutDate, checkInDate);

  const bookedRoom = bookingDetails.hotelId.rooms.find(
    (room) => room.roomId === bookingDetails.roomId
  );
  const roomRate = bookedRoom ? bookedRoom.rate : 0;
  const subtotal = roomRate * totalNights;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-t-xl shadow-sm p-6 border-b-2 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Booking Confirmation
                </h1>
                <p className="text-gray-600 mt-1">
                  Booking ID: {bookingDetails.bookingId}
                </p>
              </div>
              <div className="flex items-center">
                <div
                  className={`px-4 py-2 rounded-full ${
                    bookingDetails.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : bookingDetails.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <span className="capitalize">{bookingDetails.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-sm rounded-b-xl">
            {/* Hotel Details */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Home className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {bookingDetails.hotelId.hotelName}
                  </h2>
                  <div className="mt-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {bookingDetails.hotelId.streetAddress},{" "}
                      {bookingDetails.hotelId.place}
                    </p>
                    <p className="mt-1 ml-6">
                      {bookingDetails.hotelId.state},{" "}
                      {bookingDetails.hotelId.country}
                    </p>
                  </div>
                  {bookingDetails.hotelId.amenities && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">
                        Amenities:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {bookingDetails.hotelId.amenities.map(
                          (amenity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="grid md:grid-cols-2 gap-6 p-6 border-b border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-medium">
                      {format(checkInDate, "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-medium">
                      {format(checkOutDate, "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Room Type</p>
                    <p className="font-medium capitalize">
                      {bookedRoom?.type || "Standard Room"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Room Capacity</p>
                    <p className="font-medium">
                      {bookedRoom?.capacity || 2} Persons
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Guest Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Guest Name</p>
                    <p className="font-medium">
                      {bookingDetails.userId.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{bookingDetails.userId.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Price Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Room Charges ({totalNights}{" "}
                    {totalNights === 1 ? "Night" : "Nights"} × ₹{roomRate})
                  </span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  Booked on:{" "}
                  {format(
                    new Date(bookingDetails.createdAt),
                    "MMM dd, yyyy HH:mm:ss"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <CheckCircle className="w-4 h-4" />
                <span>
                  Last updated:{" "}
                  {format(
                    new Date(bookingDetails.updatedAt),
                    "MMM dd, yyyy HH:mm:ss"
                  )}
                </span>
              </div>
            </div>

            {/* Action Button */}
            {bookingDetails.status === "pending" && (
              <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingDetails;
