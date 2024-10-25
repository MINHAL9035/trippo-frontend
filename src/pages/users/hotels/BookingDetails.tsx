import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingDetails } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { IBookingDetails } from "@/interface/user/IBookingInterface";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "./bookingDetailsComponents/LoadingSpinner";
import BookingHeader from "./bookingDetailsComponents/BookingHeader";
import HotelInform from "./bookingDetailsComponents/HotelInform";
import StayDetails from "./bookingDetailsComponents/StayDetails";
import GuestInformation from "./bookingDetailsComponents/GuestInformation";
import PriceBreakdown from "./bookingDetailsComponents/PriceBreakdown";
import PaymentButton from "./bookingDetailsComponents/PaymentButton";
import BookingTimeline from "./bookingDetailsComponents/BookingTimeline";

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

  if (!bookingDetails) {
    return <LoadingSpinner />;
  }

  const bookedRoom = bookingDetails.hotelId.rooms.find(
    (room) => room.roomId === bookingDetails.roomId
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="mb-6 ">
          <div className="space-y-8">
            <BookingHeader bookingDetails={bookingDetails} />

            <div className="px-6 pb-8 space-y-8">
              <HotelInform hotel={bookingDetails.hotelId} />

              <div className="grid md:grid-cols-2 gap-6">
                <StayDetails
                  bookingDetails={bookingDetails}
                  bookedRoom={bookedRoom}
                />
                <GuestInformation user={bookingDetails.userId} />
              </div>

              <PriceBreakdown bookingDetails={bookingDetails} />

              <PaymentButton
                bookingDetails={bookingDetails}
                loading={loading}
                setLoading={setLoading}
              />

              <BookingTimeline createdAt={bookingDetails.createdAt} />
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetails;
