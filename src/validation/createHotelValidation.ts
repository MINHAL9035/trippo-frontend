import * as Yup from "yup";

export const HotelValidationSchema = Yup.object().shape({
  hotelName: Yup.string().required("Hotel name is required"),
  roomType: Yup.string().required("Room type is required"),
  numberOfRooms: Yup.string()
    .matches(/^\d+$/, "Number of rooms must be a valid number")
    .required("Number of rooms is required"),
  streetAddress: Yup.string().required("Street address is required"),
  place: Yup.string().required("Place is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  price: Yup.string()
    .matches(/^\d+$/, "Price must be a valid number")
    .required("Price is required"),
});
