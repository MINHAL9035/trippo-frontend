import { HotelAndOwnerInterface } from "@/interface/owner/IHotelAndOwner.interface";
import { clearOwnerEmail } from "@/redux/slices/hotelOwnerSlice";
import { clearHotelId } from "@/redux/slices/hotelSlice";
import { RootState } from "@/redux/store/store";
import { getFullDetails, submitDetails } from "@/service/api/hotel";
import handleError from "@/utils/errorHandler";
import { CheckCircle, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SummaryProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Summary: React.FC<SummaryProps> = ({ setStep }) => {
  const [fullDetails, setFullDetails] = useState<HotelAndOwnerInterface | null>(
    null
  );
  const hotelId = useSelector((state: RootState) => state.hotel.hotelId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getFullDetails(hotelId);
        setFullDetails(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchDetails();
  }, [hotelId]);

  const handleSubmit = async () => {
    try {
      if (!fullDetails) {
        console.error("No details to submit");
        return;
      }
      const detailsToSubmit = {
        hotelId: fullDetails._id,
        ownerId: fullDetails.ownerId._id,
      };

      const response = await submitDetails(detailsToSubmit);
      if (response.status === 201) {
        dispatch(clearOwnerEmail());
        dispatch(clearHotelId());
        navigate("/hotelOwner/requested_success");
      }
      return response;
    } catch (error) {
      handleError(error);
    }
  };

  if (!fullDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Registration Summary
      </h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              First Name
            </span>
            <span className="text-base text-gray-800">
              {fullDetails.ownerId.firstName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Last Name</span>
            <span className="text-base text-gray-800">
              {fullDetails.ownerId.lastName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-base text-gray-800">
              {fullDetails.ownerId.email}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">
              Mobile Number
            </span>
            <span className="text-base text-gray-800">
              {fullDetails.ownerId.mobileNumber}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Hotel Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(fullDetails)
            .filter(
              ([key]) =>
                key !== "ownerId" &&
                key !== "_id" &&
                key !== "__v" &&
                key !== "createdAt" &&
                key !== "updatedAt"
            )
            .map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  {key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </span>
                <span className="text-base text-gray-800">{value}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-600 mb-4">
          Please review the information above before submitting your
          registration.
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-6 py-2 text-gray-800 rounded-md flex items-center hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
        >
          Submit Registration
          <CheckCircle className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Summary;
