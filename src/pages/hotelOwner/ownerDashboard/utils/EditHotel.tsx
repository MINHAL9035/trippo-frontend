import React, { useEffect, useState } from "react";
import SideBarComponent from "@/components/hotelDashboard/SideBarComponent";
import { useLocation } from "react-router-dom";
import handleError from "@/utils/errorHandler";
import { fetchHotelDetails } from "@/service/api/hotel";
import BasicInformation from "./BasicInformation";
import HotelInformation from "./HotelInformation";
import { Hotel, User } from "lucide-react";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
const EditHotel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelInterface | null>(null);
  const [step, setStep] = useState(1);
  const location = useLocation();
  const hotelId = location.state?.hotelId;

  useEffect(() => {
    const fecthHotelDetails = async () => {
      try {
        const response = await fetchHotelDetails(hotelId);
        if (response.status === 200) {
          setHotelDetails(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fecthHotelDetails();
  }, [hotelId, setHotelDetails]);

  const handleLoadHotel = (details: HotelInterface) => {
    setHotelDetails(details);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInformation
            setStep={setStep}
            hotelDetails={hotelDetails}
            setHotel={handleLoadHotel}
            hotelId={hotelId}
          />
        );
      case 2:
        return <HotelInformation setStep={setStep}  hotelId={hotelId}   hotelDetails={hotelDetails} />;
      default:
        return null;
    }
  };

  return (
    <>
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
              <div className="text-xl font-semibold text-gray-800">
                EditHotel
              </div>
              <div className="flex items-center"></div>
            </div>
          </nav>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="mx-auto mb-36 max-w-6xl mt-2 md:mt-2 p-6 md:p-12 lg:p-24 bg-white rounded-xl ">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-9 md:space-y-9 md:space-x-10 lg:space-x-14  md:-mt-10">
                {[
                  { name: "Basic Information", icon: User },
                  { name: "Hotel Information", icon: Hotel },
                ].map((s, index) => (
                  <React.Fragment key={s.name}>
                    <div
                      className={`flex flex-col items-center ${
                        index < step ? "text-yellow-500" : "text-gray-600"
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full">
                        {React.createElement(s.icon, { className: "w-5 h-5" })}
                      </div>
                      <span className="mt-2 text-sm font-medium">{s.name}</span>
                    </div>
                    {index < 1 && (
                      <div
                        className={`hidden md:block w-24 lg:w-44 h-1 rounded-lg ${
                          index < step - 1 ? "bg-yellow-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              {renderStep()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
