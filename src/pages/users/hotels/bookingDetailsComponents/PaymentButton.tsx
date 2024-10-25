import { CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { IBookingDetails } from "@/interface/user/IBookingInterface";
import { useState } from "react";
import ErrorModal from "./ErrorModal";

interface PaymentButtonProps {
  bookingDetails: IBookingDetails;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const PaymentButton = ({
  bookingDetails,
  loading,
  setLoading,
}: PaymentButtonProps) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const handlePayment = async () => {
    setLoading(true);
    const stripe = await loadStripe(
      "pk_test_51Q3EDJ045cVLbfg4r3Rt3CIACoeazX1GZAqJDNGLAgZ0rHoCwilXuLXTTqo1jnVt44XPCAxAAC8GJ5WiuzgPTUbc00xFHRGohX"
    );

    if (!bookingDetails) return;

    const body = {
      bookingId: bookingDetails.bookingId,
      amount: Math.round(bookingDetails.totalPrice * 100),
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
        throw new Error(errorText);
      }

      const session = await response.json();

      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        throw new Error("Stripe failed to load");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      if (error instanceof Error) {
        setErrorMessage(error);
      } else {
        setErrorMessage(new Error("An unexpected error occurred"));
      }
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  if (bookingDetails.status !== "pending") {
    return null;
  }

  return (
    <>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        error={errorMessage}
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 
                 transition duration-200 flex items-center justify-center gap-3 
                 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg 
                 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-offset-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            <span className="font-medium">Processing Payment...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Proceed to Payment</span>
          </>
        )}
      </button>
    </>
  );
};

export default PaymentButton;
