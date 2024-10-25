import { ElementType, ReactNode, useEffect, useState } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Home,
  Clock,
  DollarSign,
  Download,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { getcompletedBookings } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { BookingDetails } from "@/interface/user/ICompletedBooking";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";

interface DetailRowProps {
  icon: ElementType;
  label: string;
  value: string | number;
}

interface InfoCardProps {
  title: string;
  icon?: ElementType;
  children: ReactNode;
  className?: string;
}

const BookingSuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const response = await getcompletedBookings(bookingId);
        if (response.status === 200) {
          setBookingDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    if (bookingId) {
      fetchCompletedBookings();
    }
  }, [bookingId]);

  console.log("my completed bookings", bookingDetails);

  if (!bookingDetails) return null;

  const room = bookingDetails.hotelId.rooms.find(
    (r) => r.roomId === bookingDetails.roomId
  );

  const InfoCard = ({
    title,
    icon: Icon,
    children,
    className = "",
  }: InfoCardProps) => (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-blue-600" />}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const DetailRow = ({ icon: Icon, label, value }: DetailRowProps) => (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Icon className="h-5 w-5 text-gray-500" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700">
          <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="flex flex-col items-center text-white">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Booking Confirmed!</h1>
              <p className="text-blue-100">
                Booking ID:{" "}
                <span className="font-medium text-white">
                  {bookingDetails.bookingId}
                </span>
              </p>
              {/* <div className="mt-4 text-sm text-blue-100 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              Confirmation sent to {bookingDetails.userId.email}
            </div> */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto -mt-8 px-4 pb-12">
          <div className="grid gap-6">
            {/* Property Card */}
            <InfoCard title="Property Details" icon={Home}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={bookingDetails.hotelId.images[0]}
                      alt={bookingDetails.hotelId.hotelName}
                      className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {bookingDetails.hotelId.hotelName}
                  </h3>
                  <p className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm mb-4">
                    {bookingDetails.hotelId.hotelType}
                  </p>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-gray-400" />
                    <p className="text-gray-600 leading-relaxed">
                      {bookingDetails.hotelId.streetAddress},{" "}
                      {bookingDetails.hotelId.place},{" "}
                      {bookingDetails.hotelId.state},{" "}
                      {bookingDetails.hotelId.country}
                    </p>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Stay Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Booking Summary */}
              <InfoCard title="Booking Summary" icon={Calendar}>
                <div className="space-y-2">
                  <DetailRow
                    icon={Calendar}
                    label="Check-in"
                    value={format(
                      new Date(bookingDetails.checkIn),
                      "EEEE, MMM d, yyyy"
                    )}
                  />
                  <DetailRow
                    icon={Calendar}
                    label="Check-out"
                    value={format(
                      new Date(bookingDetails.checkOut),
                      "EEEE, MMM d, yyyy"
                    )}
                  />
                  <DetailRow
                    icon={Clock}
                    label="Duration"
                    value={`${bookingDetails.nights} night${
                      bookingDetails.nights > 1 ? "s" : ""
                    }`}
                  />
                </div>
              </InfoCard>

              {/* Price Details */}
              <InfoCard title="Price Details" icon={DollarSign}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600 py-2">
                      <span>Room Rate (per night)</span>
                      <span>₹{room?.rate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 py-2">
                      <span>Number of Nights</span>
                      <span>{bookingDetails.nights}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 py-2">
                      <span>Number of Rooms</span>
                      <span>{bookingDetails.rooms}</span>
                    </div>
                  </div>
                  <div className="border-t border-dashed pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount</span>
                      <span className="text-green-600">
                        ₹{bookingDetails.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </InfoCard>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-96">
              <button
                onClick={() => (window.location.href = "/home")}
                className="flex items-center justify-center gap-10 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Home
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Download Booking Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingSuccessPage;
