import AutocompleteField from "@/components/form/AutocompleteField";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { setHotelId } from "@/redux/slices/hotelSlice";
import { RootState } from "@/redux/store/store";
import { createHotel, updateHotel } from "@/service/api/hotel";
import handleError from "@/utils/errorHandler";
import { HotelValidationSchema } from "@/validation/createHotelValidation";
import { ErrorMessage, Field, Formik } from "formik";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
interface HotelInfoProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hotelDetails: HotelInterface | null;
  loadDetails: (details: HotelInterface) => void;
}
const HotelInfo: React.FC<HotelInfoProps> = ({
  setStep,
  hotelDetails,
  loadDetails,
}) => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.hotelOwner.email);
  const hotelId = useSelector((state: RootState) => state.hotel.hotelId);
  const initialValues = {
    hotelName: hotelDetails?.hotelName || "",
    streetAddress: hotelDetails?.streetAddress || "",
    place: hotelDetails?.place || "",
    state: hotelDetails?.state || "",
    country: hotelDetails?.country || "",
  };

  const handleSubmit = async (values: HotelInterface) => {
    try {
      let response;
      if (hotelId) {
        response = await updateHotel(values, hotelId);
        if (response.status === 200) {
          dispatch(setHotelId(response.data._id));
          loadDetails(response.data);
          setStep(3);
        }
      } else {
        response = await createHotel(values, email);
        if (response.status === 201) {
          dispatch(setHotelId(response.data._id));
          loadDetails(response.data);
          setStep(3);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HotelValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Hotel Information
          </h2>
          <div>
            <label
              htmlFor="hotelName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hotel Name
            </label>
            <Field
              type="text"
              id="hotelName"
              name="hotelName"
              className={`w-full px-3 py-2 border ${
                errors.hotelName && touched.hotelName
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            />
            <div className="min-h-[20px] mt-1">
              <ErrorMessage
                name="hotelName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Street Address
            </label>
            <Field
              type="text"
              id="streetAddress"
              name="streetAddress"
              className={`w-full px-3 py-2 border ${
                errors.streetAddress && touched.streetAddress
                  ? "border-red-500"
                  : "border-gray-300"
              }  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            />
            <div className="min-h-[20px] mt-1">
              <ErrorMessage
                name="streetAddress"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AutocompleteField
              id="place"
              label="Place"
              placeholder="Search for a place"
              value={values.place || ""}  
              onChange={(selectedPlace) =>
                setFieldValue("place", selectedPlace)
              }
              onBlur={() => setFieldValue("place", values.place)}
              error={errors.place}
              touched={touched.place}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <Field
                type="text"
                id="state"
                name="state"
                className={`w-full px-3 py-2 border ${
                  errors.state && touched.state
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                className={`w-full px-3 py-2 border ${
                  errors.country && touched.country
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 text-gray-800 rounded-md flex items-center hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default HotelInfo;
