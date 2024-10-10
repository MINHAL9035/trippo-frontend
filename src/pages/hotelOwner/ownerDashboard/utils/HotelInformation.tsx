import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Plus, Minus, X, ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HotelInformationSchema } from "@/validation/editHotelValidation";
import handleError from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { editHotelInformation } from "@/service/api/hotel";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";

interface HotelImage {
  file: File | null;
  preview: string;
}

interface Room {
  type: string;
  rate: number;
  capacity: number;
  available: number;
  amenities: string[];
  availableDates: [Date | null, Date | null];
}

interface HotelFormValues {
  images: HotelImage[];
  hotelType: string;
  amenities: string[];
  rooms: Room[];
}

interface HotelInformationFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hotelId: string;
  hotelDetails: HotelInterface | null;
}

const HotelInformationForm: React.FC<HotelInformationFormProps> = ({
  setStep,
  hotelId,
  hotelDetails,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const getInitialValues = (): HotelFormValues => {
    if (hotelDetails) {
      return {
        images: hotelDetails.images
          ? hotelDetails.images.map((imageUrl) => ({
              file: null,
              preview: imageUrl,
            }))
          : [],
        hotelType: hotelDetails.hotelType || "",
        amenities: hotelDetails.amenities || [],
        rooms:
          hotelDetails.rooms?.map((room) => ({
            type: room.type || "",
            rate: room.rate || 0,
            capacity: room.capacity || 0,
            available: room.available || 0,
            amenities: room.amenities || [],
            availableDates: [
              room.availableDates?.[0]
                ? new Date(room.availableDates[0])
                : null,
              room.availableDates?.[1]
                ? new Date(room.availableDates[1])
                : null,
            ],
          })) || [],
      };
    }
    return {
      images: [],
      hotelType: "",
      amenities: [],
      rooms: [
        {
          type: "",
          rate: 0,
          capacity: 0,
          available: 0,
          amenities: [],
          availableDates: [null, null],
        },
      ],
    };
  };

  const initialValues = getInitialValues();

  const handleSubmit = async (values: HotelFormValues) => {
    try {
      const formData = new FormData();
      formData.append("hotelType", values.hotelType);
      values.images.forEach((image, index) => {
        if (image.file) {
          formData.append(`hotelImages`, image.file);
        } else {
          formData.append(`hotelImages[${index}]`, image.preview);
        }
      });
      formData.append("amenities", JSON.stringify(values.amenities));
      formData.append("rooms", JSON.stringify(values.rooms));
      const response = await editHotelInformation(formData, hotelId);
      if (response.status === 200) {
        navigate("/hotelOwner/ownerHotels");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void,
    values: HotelFormValues
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFieldValue("images", [...values.images, ...newImages]);
    }
  };

  const removeImage = (
    index: number,
    setFieldValue: (field: string, value: unknown) => void,
    values: HotelFormValues
  ) => {
    const newImages = values.images.filter((_, i) => i !== index);
    setFieldValue("images", newImages);
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HotelInformationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6 p-4">
          {/* Hotel Images section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Hotel Images</h2>
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) =>
                  handleImageUpload(event, setFieldValue, values)
                }
                className="mb-4"
              />
              {values.images.length > 0 && (
                <div className="relative w-full max-w-md">
                  <img
                    src={values.images[currentImageIndex].preview}
                    alt={`Hotel preview ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() =>
                        removeImage(currentImageIndex, setFieldValue, values)
                      }
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
              {values.images.length > 1 && (
                <div className="flex justify-center mt-2 space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) =>
                          (prev - 1 + values.images.length) %
                          values.images.length
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev + 1) % values.images.length
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <ErrorMessage
              name="images"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Hotel Details section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Hotel Details</h2>
            <div>
              <label
                htmlFor="hotelType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hotel Type
              </label>
              <Field
                id="hotelType"
                name="hotelType"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter hotel type"
              />
              <ErrorMessage
                name="hotelType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Hotel Amenities
              </h3>
              <FieldArray name="amenities">
                {({ remove, push }) => (
                  <div>
                    {values.amenities.map((_amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Field
                          name={`amenities.${index}`}
                          className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter amenity"
                        />
                        <button
                          type="button"
                          className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                          onClick={() => remove(index)}
                        >
                          <Minus size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center"
                      onClick={() => push("")}
                    >
                      <Plus size={20} className="mr-2" />
                      Add Amenity
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage
                name="amenities"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Room Details section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Room Details</h2>
            <FieldArray name="rooms">
              {({ remove, push }) => (
                <div>
                  {values.rooms.map((room, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-md p-4 mb-4"
                    >
                      <h3 className="text-lg font-medium mb-2">
                        Room {index + 1}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor={`rooms.${index}.type`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Room Type
                          </label>
                          <Field
                            name={`rooms.${index}.type`}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter room type"
                          />
                          <ErrorMessage
                            name={`rooms.${index}.type`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`rooms.${index}.rate`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Room Rate
                          </label>
                          <Field
                            type="number"
                            name={`rooms.${index}.rate`}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter room rate"
                          />
                          <ErrorMessage
                            name={`rooms.${index}.rate`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`rooms.${index}.capacity`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Room Capacity
                          </label>
                          <Field
                            type="number"
                            name={`rooms.${index}.capacity`}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter room capacity"
                          />
                          <ErrorMessage
                            name={`rooms.${index}.capacity`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`rooms.${index}.available`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Available Rooms
                          </label>
                          <Field
                            type="number"
                            name={`rooms.${index}.available`}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter available rooms"
                          />
                          <ErrorMessage
                            name={`rooms.${index}.available`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div className="col-span-2">
                          <label
                            htmlFor={`rooms.${index}.availableDates`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Available Dates
                          </label>
                          <DatePicker
                            selectsRange={true}
                            startDate={
                              room.availableDates[0]
                                ? room.availableDates[0]
                                : undefined
                            }
                            endDate={
                              room.availableDates[1]
                                ? room.availableDates[1]
                                : undefined
                            }
                            onChange={(update: [Date | null, Date | null]) => {
                              setFieldValue(
                                `rooms.${index}.availableDates`,
                                update
                              );
                            }}
                            isClearable={true}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholderText="Select date range"
                          />
                          <ErrorMessage
                            name={`rooms.${index}.availableDates`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-md font-medium mb-2">
                          Room Amenities
                        </h4>
                        <FieldArray name={`rooms.${index}.amenities`}>
                          {({ remove: removeAmenity, push: pushAmenity }) => (
                            <div>
                              {room.amenities.map((_amenity, amenityIndex) => (
                                <div
                                  key={amenityIndex}
                                  className="flex items-center space-x-2 mb-2"
                                >
                                  <Field
                                    name={`rooms.${index}.amenities.${amenityIndex}`}
                                    className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter room amenity"
                                  />
                                  <button
                                    type="button"
                                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    onClick={() => removeAmenity(amenityIndex)}
                                  >
                                    <Minus size={20} />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center"
                                onClick={() => pushAmenity("")}
                              >
                                <Plus size={20} className="mr-2" />
                                Add Room Amenity
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <ErrorMessage
                          name={`rooms.${index}.amenities`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                          onClick={() => remove(index)}
                        >
                          Remove Room
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                    onClick={() =>
                      push({
                        type: "",
                        rate: 0,
                        capacity: 0,
                        available: 0,
                        amenities: [""],
                        availableDates: [null, null],
                      })
                    }
                  >
                    <Plus size={20} className="mr-2" />
                    Add Room
                  </button>
                </div>
              )}
            </FieldArray>
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
              submit edit
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HotelInformationForm;
