import * as Yup from "yup";

export const HotelValidationSchema = Yup.object().shape({
  hotelName: Yup.string().required("Hotel name is required"),
  streetAddress: Yup.string().required("Street address is required"),
  place: Yup.string().required("Place is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});
