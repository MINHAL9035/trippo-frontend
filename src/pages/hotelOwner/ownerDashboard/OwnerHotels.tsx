import { useCallback, useEffect, useState } from "react";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import { Hotel, MapPin, DollarSign, Plus, ChevronRight } from "lucide-react";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import handleError from "@/utils/errorHandler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getOwnerHotels } from "@/service/api/hotelOwner";

const OwnerHotels = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelInterface[]>([]);
  const ownerId = useSelector((state: RootState) => state.hotelOwner.ownerInfo);

  const fetchHotels = useCallback(async () => {
    try {
      const response = await getOwnerHotels(ownerId.ownerId);
      if (response.status === 200) {
        setHotelDetails(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  }, [ownerId.ownerId]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBarComponent collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <nav className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="text-xl font-semibold text-gray-800">Hotels</div>
            <div className="flex items-center"></div>
          </div>
        </nav>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Your Hotels</h1>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
                <Plus size={20} className="mr-2" />
                Add New Hotel
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {hotelDetails.map((hotel) => (
                  <li key={hotel._id} className="hover:bg-gray-50">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {hotel.hotelName}
                          </p>
                          {/* <div className="flex items-center text-sm text-gray-500">
                            <Star className="flex-shrink-0 mr-1.5 h-4 w-4 text-yellow-400" />
                            <p>{hotel.rating}</p>
                          </div> */}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{hotel.place}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-end">
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <Hotel className="flex-shrink-0 mr-1.5 h-4 w-4 text-blue-500" />
                            <p>{hotel.numberOfRooms} Rooms</p>
                          </div>
                          {/* <div className="flex items-center text-sm text-gray-500">
                            <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-500" />
                            <p>{hotel.occupancy}% Occupancy</p>
                          </div> */}
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-purple-500" />
                          <p>${hotel.price}</p>
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          View Details
                          <ChevronRight className="ml-2 -mr-0.5 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerHotels;
