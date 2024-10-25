// // import { Hotel } from "lucide-react";

// // const Cancelled: React.FC<CancelledBookingsProps> = ({ bookings }) => {
// //   console.log("bookings", bookings);

// //   return (
// //     <>
// //       <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
// //         <Hotel className="w-16 h-16 text-gray-300 mb-4" />
// //         <h3 className="font-semibold text-xl mb-2">No Cancelled Bookings</h3>
// //         <p className="text-gray-500 text-center max-w-md">
// //           You don't have any cancelled bookings at the moment.
// //         </p>
// //       </div>
// //     </>
// //   );
// // };

// // export default Cancelled;

// import React from "react";
// import { Hotel, Calendar, MapPin, Users, IndianRupee } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// export interface Booking {
//   _id: string;
//   bookingId: string;
//   totalPrice: number;
//   rooms: number;
//   checkIn: string;
//   checkOut: string;
//   nights: number;
//   hotelId: {
//     hotelName: string;
//     place: string;
//     state: string;
//     hotelType: string;
//   };
//   userId: {
//     fullName: string;
//   };
// }

// export interface CancelledBookingsProps {
//   bookings: Booking[];
// }

// const Cancelled: React.FC<CancelledBookingsProps> = ({ bookings }) => {
//   if (!bookings || bookings.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
//         <Hotel className="w-16 h-16 text-gray-300 mb-4" />
//         <h3 className="font-semibold text-xl mb-2">No Cancelled Bookings</h3>
//         <p className="text-gray-500 text-center max-w-md">
//           You don't have any cancelled bookings at the moment.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-h-[600px] overflow-y-auto px-4">
//       <div className="space-y-4">
//         {bookings.map((booking) => (
//           <Card key={booking._id} className="border-red-100 bg-red-50">
//             <CardContent className="p-6">
//               <div className="flex flex-col space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div className="flex items-center space-x-2">
//                     <Hotel className="w-5 h-5 text-gray-600" />
//                     <div>
//                       <h3 className="font-semibold text-lg">
//                         {booking.hotelId.hotelName}
//                       </h3>
//                       <div className="flex items-center text-sm text-gray-600">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         {booking.hotelId.place}, {booking.hotelId.state}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end">
//                     <span className="text-red-600 font-medium px-3 py-1 bg-red-100 rounded-full text-sm">
//                       Cancelled
//                     </span>
//                     <span className="text-sm text-gray-500 mt-1">
//                       #{booking.bookingId}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="w-4 h-4 text-gray-500" />
//                     <div className="text-sm">
//                       <p className="text-gray-500">Check In</p>
//                       <p className="font-medium">
//                         {new Date(booking.checkIn).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Calendar className="w-4 h-4 text-gray-500" />
//                     <div className="text-sm">
//                       <p className="text-gray-500">Check Out</p>
//                       <p className="font-medium">
//                         {new Date(booking.checkOut).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Users className="w-4 h-4 text-gray-500" />
//                     <div className="text-sm">
//                       <p className="text-gray-500">Rooms</p>
//                       <p className="font-medium">{booking.rooms}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <IndianRupee className="w-4 h-4 text-gray-500" />
//                     <div className="text-sm">
//                       <p className="text-gray-500">Total Amount</p>
//                       <p className="font-medium">₹{booking.totalPrice}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cancelled;

import React from "react";
import {
  Hotel,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Clock,
  Tag,
  Building,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Booking {
  createdAt: string | number | Date;
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

export interface CancelledBookingsProps {
  bookings: Booking[];
}

const Cancelled: React.FC<CancelledBookingsProps> = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
        <Hotel className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="font-semibold text-xl mb-2">No Cancelled Bookings</h3>
        <p className="text-gray-500 text-center max-w-md">
          You don't have any cancelled bookings at the moment.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto px-4 py-2">
      

      <div className="space-y-6">
        {bookings.map((booking) => (
          <Card
            key={booking._id}
            className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Building className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800">
                        {booking.hotelId.hotelName}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-sm">
                          {booking.hotelId.place}, {booking.hotelId.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-gray-100">
                          {booking.hotelId.hotelType}
                        </Badge>
                        <Badge
                          variant="destructive"
                          className="bg-red-100 text-red-700 hover:bg-red-100"
                        >
                          Cancelled
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-500">
                      Booking ID
                    </span>
                    <span className="font-mono text-sm text-gray-800">
                      #{booking.bookingId}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Check In</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(booking.checkIn)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md">
                      <Calendar className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Check Out</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(booking.checkOut)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md">
                      <Users className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rooms</p>
                      <p className="font-medium text-gray-800">
                        {booking.rooms} {booking.rooms === 1 ? "Room" : "Rooms"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-md">
                      <IndianRupee className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-medium text-gray-800">
                        ₹{booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      Duration: {booking.nights}{" "}
                      {booking.nights === 1 ? "Night" : "Nights"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Tag className="w-4 h-4" />
                    <span>Guest: {booking.userId.fullName}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cancelled;
