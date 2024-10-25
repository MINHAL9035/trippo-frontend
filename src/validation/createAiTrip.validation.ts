  import * as Yup from "yup";

  export const createAiTripValidation = Yup.object().shape({
    place: Yup.string()
      .min(2, "Place must be at least 2 characters long")
      .max(50, "Place can't exceed 50 characters")
      .required("Place is required"),
    days: Yup.number()
      .min(1, "Trip must be at least 1 day long")
      .max(30, "Trip can't exceed 30 days")
      .required("Number of days is required"),
    budget: Yup.string().required("Budget selection is required"),
    travelers: Yup.string().required("Traveler type selection is required"),
  });
