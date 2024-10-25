import React, { useState } from "react";
import { Formik, Form } from "formik";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HotelInformationSchema } from "@/validation/editHotelValidation";
import { useNavigate } from "react-router-dom";
import { editHotelInformation } from "@/service/api/hotel";
import handleError from "@/utils/errorHandler";
import {
  HotelFormValues,
  HotelInformationFormProps,
} from "@/interface/owner/editHotelInterface";
import { ImageSection } from "../editHotel/ImageSection";
import { HotelDetailsSection } from "../editHotel/HotelDetailsSection";
import { RoomSection } from "../editHotel/RoomSection";
import { LoadingSpinner } from "../editHotel/LoadingSpinner";

const HotelInformationForm: React.FC<HotelInformationFormProps> = ({
  setStep,
  hotelId,
  hotelDetails,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getInitialValues = (): HotelFormValues => {
    if (hotelDetails) {
      return {
        images: hotelDetails.images
          ? hotelDetails.images.map((imageUrl) => ({
              file: null,
              preview: imageUrl,
              isExisting: true,
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
        isExisting: false,
      }));
      setFieldValue("images", [...values.images, ...newImages]);
    }
  };

  const handleSubmit = async (values: HotelFormValues) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      const existingImages = values.images
        .filter((img) => img.isExisting)
        .map((img) => img.preview);
      formData.append("existingImages", JSON.stringify(existingImages));
      values.images
        .filter((img) => !img.isExisting && img.file)
        .forEach((image) => {
          formData.append("hotelImages", image.file!);
        });

      formData.append("hotelType", values.hotelType);
      formData.append("amenities", JSON.stringify(values.amenities));
      formData.append("rooms", JSON.stringify(values.rooms));

      const response = await editHotelInformation(formData, hotelId);
      if (response.status === 200) {
        navigate("/hotelOwner/ownerHotels");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={HotelInformationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6 p-4" encType="multipart/form-data">
          <ImageSection
            images={values.images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            onImageUpload={(e) => handleImageUpload(e, setFieldValue, values)}
            onImageRemove={(index) => {
              const newImages = values.images.filter((_, i) => i !== index);
              setFieldValue("images", newImages);
              if (currentImageIndex >= newImages.length) {
                setCurrentImageIndex(Math.max(0, newImages.length - 1));
              }
            }}
          />

          <HotelDetailsSection values={values} />
          <RoomSection values={values} setFieldValue={setFieldValue} />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 text-gray-800 rounded-md flex items-center hover:bg-gray-100"
              disabled={isSubmitting}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  Submit Edit
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default HotelInformationForm;
