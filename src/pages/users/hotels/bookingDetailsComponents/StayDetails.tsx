import { IBookingDetails } from "@/interface/user/IBookingInterface";
import { format } from "date-fns";

interface Room {
  roomId: string;
  type: string;
  capacity: number;
}

interface StayDetailsProps {
  bookingDetails: IBookingDetails;
  bookedRoom: Room | undefined;
}
interface InfoCardProps {
    label: string;
    value: string;
    capitalize?: boolean;
  }
const StayDetails = ({ bookingDetails, bookedRoom }: StayDetailsProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Stay Details</h3>
      <div className="grid grid-cols-2 gap-6">
        <InfoCard
          label="Check-in"
          value={format(new Date(bookingDetails.checkIn), "MMM dd, yyyy")}
        />
        <InfoCard
          label="Check-out"
          value={format(new Date(bookingDetails.checkOut), "MMM dd, yyyy")}
        />
        <InfoCard label="Room Type" value={bookedRoom?.type || 'N/A'} capitalize />
        <InfoCard
          label="Room Capacity"
          value={`${bookedRoom?.capacity} Persons`}
        />
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, capitalize = false }: InfoCardProps) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p
      className={`font-medium text-gray-900 ${capitalize ? "capitalize" : ""}`}
    >
      {value}
    </p>
  </div>
);

export default StayDetails;
