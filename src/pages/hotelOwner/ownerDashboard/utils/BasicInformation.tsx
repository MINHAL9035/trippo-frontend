import AutocompleteField from "@/components/form/AutocompleteField";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { editHotel } from "@/service/api/hotel";
import handleError from "@/utils/errorHandler";
import { HotelBasicInformationSchema } from "@/validation/editHotelValidation";
import { ErrorMessage, Field, Formik } from "formik";
import { ChevronRight, ChevronLeft } from "lucide-react";
import React from "react";

interface BasicInformationProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hotelDetails: HotelInterface | null;
  setHotel: (setHotel: HotelInterface) => void;
  hotelId: string;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  setStep,
  hotelDetails,
  setHotel,
  hotelId,
}) => {
  const initialValues = {
    hotelName: hotelDetails?.hotelName || "",
    place: hotelDetails?.place || "",
    description: hotelDetails?.description || "",
  };

  const handleSubmit = async (values: HotelInterface) => {
    try {
      const response = await editHotel(values, hotelId);
      if (response.status === 200) {
        setStep(2);
        setHotel(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HotelBasicInformationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, errors, touched, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="hotelName"
              >
                Hotel Name
              </label>
              <Field
                type="text"
                id="hotelName"
                name="hotelName"
                placeholder="Enter hotel name"
                className={`w-full px-3 py-2 border ${
                  errors.hotelName && touched.hotelName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="hotelName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="-mt-1">
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
          </div>

          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Hotel Description
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your hotel"
            rows="2"
          />
          <div>
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm "
            />
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

export default BasicInformation;
