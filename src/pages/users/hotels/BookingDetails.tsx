import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Users, Home, CreditCard, Clock } from "lucide-react";
import { getBookingDetails } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Spin } from 'antd';

interface Hotel {
  _id: string;
  ownerId: string;
  hotelName: string;
  roomType: string;
  numberOfRooms: string;
  streetAddress: string;
  place: string;
  state: string;
  country: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  verified: boolean;
  is_blocked: boolean;
  isGoogle: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingDetails {
  _id: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number[];
  hotelId: Hotel;
  userId: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
}

const BookingDetails: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const bookingId = location.state?.bookingId;

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
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const totalNights = Math.ceil(
    (new Date(bookingDetails.checkOut).getTime() -
      new Date(bookingDetails.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const subtotal = parseInt(bookingDetails.hotelId.price) * totalNights;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await loadStripe(
      "pk_test_51Q3EDJ045cVLbfg4r3Rt3CIACoeazX1GZAqJDNGLAgZ0rHoCwilXuLXTTqo1jnVt44XPCAxAAC8GJ5WiuzgPTUbc00xFHRGohX"
    );
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

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Booking Details
            </h1>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                Booking ID:{" "}
                <span className="font-semibold">
                  {bookingDetails.bookingId}
                </span>
              </p>
              <p className="text-blue-700">
                Status:{" "}
                <span className="font-semibold capitalize">
                  {bookingDetails.status}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Home className="mr-2" /> Hotel Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-800">
                    {bookingDetails.hotelId.hotelName}
                  </p>
                  <p className="text-gray-600">
                    {bookingDetails.hotelId.streetAddress}
                  </p>
                  <p className="text-gray-600">
                    {bookingDetails.hotelId.place},{" "}
                    {bookingDetails.hotelId.state}
                  </p>
                  <p className="text-gray-600">
                    {bookingDetails.hotelId.country}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="mr-2" /> Booking Details
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    Check-in:{" "}
                    <span className="font-medium">
                      {format(new Date(bookingDetails.checkIn), "MMM dd, yyyy")}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Check-out:{" "}
                    <span className="font-medium">
                      {format(new Date(bookingDetails.checkOut), "MMM dd, yyyy")}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Room Type:{" "}
                    <span className="font-medium">
                      {bookingDetails.hotelId.roomType}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <Users className="inline mr-1" />
                    {bookingDetails.adults} Adults,{" "}
                    {bookingDetails.children.length} Children
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="mr-2" /> Price Summary
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {totalNights} nights x ₹{bookingDetails.hotelId.price}
                      /night
                    </span>
                    <span className="font-medium text-gray-800">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes (8%)</span>
                    <span className="font-medium text-gray-800">
                      ₹{tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="font-semibold text-gray-800">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="mr-2" /> Booking Timeline
              </h2>
              <p className="text-gray-600">
                Booked on:{" "}
                {format(new Date(bookingDetails.createdAt), "MMM dd, yyyy HH:mm:ss")}
              </p>
              <p className="text-gray-600">
                Last updated:{" "}
                {format(new Date(bookingDetails.updatedAt), "MMM dd, yyyy HH:mm:ss")}
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Spin className="mr-2" />
                    Processing...
                  </>
                ) : (
                  'Pay'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingDetails;