import { Clock } from "lucide-react";
import { format } from "date-fns";

interface BookingTimelineProps {
  createdAt: string;
}

const BookingTimeline = ({ createdAt }: BookingTimelineProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
      <Clock className="w-5 h-5 text-blue-500" />
      <span className="text-sm text-gray-600">
        Booked on:{" "}
        <span className="font-medium">
          {format(new Date(createdAt), "MMM dd, yyyy HH:mm:ss")}
        </span>
      </span>
    </div>
  );
};

export default BookingTimeline;
