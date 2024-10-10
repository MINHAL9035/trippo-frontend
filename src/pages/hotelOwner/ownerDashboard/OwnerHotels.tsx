import { useCallback, useEffect, useState } from "react";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import { Pencil, Eye } from "lucide-react";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import handleError from "@/utils/errorHandler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getOwnerHotels } from "@/service/api/hotelOwner";
import { useNavigate } from "react-router-dom";

const OwnerHotels = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelInterface[]>([]);
  const ownerId = useSelector((state: RootState) => state.hotelOwner.ownerInfo);
  const navigate = useNavigate();

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

  const handleEditClick = (hotelId: string | undefined) => {
    navigate("/hotelOwner/editHotel", { state: { hotelId: hotelId } });
  };
  const viewDetails = (hotelId: string | undefined) => {
    navigate("/hotelOwner/viewDetails", { state: { hotelId: hotelId } });
  };

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
        <div className="container mx-auto p-6">
          {/* <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Hotels</h1>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
              <Plus size={20} className="mr-2" />
              Add New Hotel
            </button>
          </div> */}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hotel Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Place
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hotelDetails.map((hotel) => (
                    <tr key={hotel._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {hotel.hotelName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hotel.place}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          onClick={() => handleEditClick(hotel._id)}
                        >
                          <Pencil size={16} className="inline mr-1" />
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 ml-10 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewDetails(hotel._id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Eye size={16} className="inline mr-1" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerHotels;
