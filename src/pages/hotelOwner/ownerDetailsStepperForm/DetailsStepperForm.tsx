import React, { useEffect, useState } from "react";
import { CheckCircle, Hotel, User } from "lucide-react";
import PersonalInfo from "./utils/PersonalInfo";
import HotelInfo from "./utils/HotelInfo";
import Summary from "./utils/Summary";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Owner } from "@/interface/owner/IOwner.interface";
import handleError from "@/utils/errorHandler";
import { getOwnerDetails } from "@/service/api/hotelOwner";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { getHotelDetails } from "@/service/api/hotel";

const DetailsStepperForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const email = useSelector((state: RootState) => state.hotelOwner.email);
  const [ownerDetails, setOwnerDetails] = useState<Owner | null>(null);
  const [hotelDetails, setHotelDetails] = useState<HotelInterface | null>(null);

  useEffect(() => {
    (async (email: string) => {
      try {
        const response = await getOwnerDetails(email);
        setOwnerDetails(response.data);
      } catch (error) {
        handleError(error);
      }
    })(email);
  }, [email]);

  const handleUpdateOwner = (updatedOwner: Owner) => {
    setOwnerDetails(updatedOwner);
  };

  useEffect(() => {
    (async (email: string) => {
      try {
        const response = await getHotelDetails(email);
        setHotelDetails(response.data);
      } catch (error) {
        handleError(error);
      }
    })(email);
  }, [email]);

  const handleLoadHotelDetails = (details: HotelInterface) => {
    setHotelDetails(details);
  };

  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            ownerDetails={ownerDetails}
            setStep={setStep}
            onUpdateOwner={handleUpdateOwner}
          />
        );
      case 2:
        return (
          <HotelInfo
            setStep={setStep}
            hotelDetails={hotelDetails}
            loadDetails={handleLoadHotelDetails}
          />
        );
      case 3:
        return <Summary setStep={setStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto mb-36 max-w-5xl mt-8 md:mt-20 p-6 md:p-12 lg:p-24 bg-white rounded-xl shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 lg:space-x-14  md:-mt-10">
        {[
          { name: "Personal Info", icon: User },
          { name: "Hotel Info", icon: Hotel },
          { name: "Confirmation", icon: CheckCircle },
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
            {index < 2 && (
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
  );
};

export default DetailsStepperForm;
