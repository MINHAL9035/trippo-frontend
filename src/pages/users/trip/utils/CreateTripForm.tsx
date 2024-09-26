import React, { useState } from "react";
import AutocompleteField from "@/components/form/AutocompleteField";
import CommonForm from "@/components/form/CommonForm";
import { CreateTrip } from "@/interface/user/ITripCreation";
import { createTrip } from "@/service/api/trip";
import handleError from "@/utils/errorHandler";
import { createTripSchema } from "@/validation/CreateTripValidation";
import { Drawer, message, Spin } from "antd";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const CreateTripForm: React.FC<DrawerProps> = ({
  open,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateTrip) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("tripName", values.tripName);
      formData.append("destination", values.destination);
      if (values.tripImage) {
        formData.append("tripImage", values.tripImage);
      }
      if (values.tripDate) {
        const [tripStartDate, tripEndDate] = values.tripDate.map(
          (dateString) => {
            const [day, month, year] = dateString.split("-");
            return new Date(`${year}-${month}-${day}`).toISOString();
          }
        );
        formData.append("tripStartDate", tripStartDate);
        formData.append("tripEndDate", tripEndDate);
      }

      const response = await createTrip(formData);
      if (response?.status === 201) {
        message.success("Trip created successfully");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Create Trip"
      maskClosable={false}
      autoFocus={true}
      onClose={onClose}
      open={open}
    >
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <CommonForm<CreateTrip>
          initialValues={{
            tripName: "",
            destination: "",
            tripImage: null,
            tripDate: null,
          }}
          validationSchema={createTripSchema}
          onSubmit={handleSubmit}
          fields={[
            {
              id: "tripImage",
              placeholder: "Upload picture",
              type: "image-upload",
              required: true,
              maxCount: 1,
              listType: "picture-card",
            },
            {
              id: "tripName",
              label: "Trip Name",
              type: "text",
              placeholder: "Enter your Trip Name",
              required: true,
            },
            {
              id: "destination",
              label: "Destination",
              type: "autocomplete",
              placeholder: "Select your destination",
              required: true,
              component: AutocompleteField,
            },
            {
              id: "tripDate",
              label: "Trip Dates",
              type: "date",
              placeholder: "Select start and end dates",
              required: true,
            },
          ]}
          submitButtonText="Create Trip"
        />
      )}
    </Drawer>
  );
};

export default CreateTripForm;
