import { IBookingDetails } from "@/interface/user/IBookingInterface";
import { format } from "date-fns";

interface PriceBreakdownProps {
  bookingDetails: IBookingDetails;
}

interface PriceRowProps {
  title: string;
  subtitle: string;
  amount?: number;
  value?: string;
}

const PriceBreakdown = ({ bookingDetails }: PriceBreakdownProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">
        Price Breakdown
      </h3>
      <div className="space-y-6">
        <PriceRow
          title="Room Rate (per night)"
          subtitle={`Base rate for ${bookingDetails.rooms} room`}
          amount={bookingDetails.roomRate}
        />
        <PriceRow
          title="Number of Nights"
          subtitle={`${format(
            new Date(bookingDetails.checkIn),
            "MMM dd"
          )} - ${format(new Date(bookingDetails.checkOut), "MMM dd")}`}
          value={`${bookingDetails.nights} nights`}
        />
        <PriceRow
          title="Calculation"
          subtitle={`₹${bookingDetails.roomRate} × ${bookingDetails.rooms} room × ${bookingDetails.nights} nights`}
          amount={bookingDetails.totalPrice}
        />
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-900">Total Amount</p>
            <p className="text-xl font-semibold text-blue-600">
              ₹{bookingDetails.totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceRow = ({ title, subtitle, amount, value }: PriceRowProps) => (
  <div className="flex justify-between items-center py-2">
    <div className="space-y-1">
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
    <p className="font-medium text-gray-900">{amount ? `₹${amount}` : value}</p>
  </div>
);

export default PriceBreakdown;
