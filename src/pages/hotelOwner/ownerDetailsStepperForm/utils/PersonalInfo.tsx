import React from "react";
import { Owner } from "@/interface/owner/IOwner.interface";
import { ErrorMessage, Field, Formik } from "formik";
import { OwnervalidationSchema } from "@/validation/createOwnerValidtaion";
import { ChevronRight } from "lucide-react";
import { updateOwner } from "@/service/api/hotelOwner";

interface PersonalInfoProps {
  ownerDetails: Owner | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onUpdateOwner: (updatedOwner: Owner) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  ownerDetails,
  setStep,
  onUpdateOwner,
}) => {
  const initialValues = {
    firstName: ownerDetails?.firstName || "",
    lastName: ownerDetails?.lastName || "",
    email: ownerDetails?.email || "",
    mobileNumber: ownerDetails?.mobileNumber || "",
    password: ownerDetails?.password || "",
    confirmPassword: "",
  };
  const handleSubmit = async (values: Owner) => {
    const response = await updateOwner(values);
    if (response.status === 200) {
      onUpdateOwner(response.data);
      setStep(2);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OwnervalidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className={`w-full px-3 py-2 border ${
                  errors.firstName && touched.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className={`w-full px-3 py-2 border ${
                  errors.lastName && touched.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <Field
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                autoComplete="new-password"
                className={`w-full px-3 py-2 border ${
                  errors.mobileNumber && touched.mobileNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                className={`w-full px-3 py-2 border ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
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

export default PersonalInfo;
