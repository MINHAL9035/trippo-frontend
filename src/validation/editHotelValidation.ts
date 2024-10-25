import * as Yup from "yup";

export const HotelBasicInformationSchema = Yup.object().shape({
  hotelName: Yup.string()
    .min(2, "Hotel name must be at least 2 characters long")
    .max(100, "Hotel name can't exceed 100 characters")
    .required("Hotel name is required"),
  place: Yup.string()
    .min(2, "Place must be at least 2 characters long")
    .max(50, "Place can't exceed 50 characters")
    .required("Place is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description can't exceed 500 characters")
    .required("Description is required"),
});

// export const HotelInformationSchema = Yup.object().shape({
//   images: Yup.array().min(1, "At least one image is required"),
//   hotelType: Yup.string().required("Hotel type is required"),
//   amenities: Yup.array()
//     .of(Yup.string())
//     .min(1, "At least one amenity is required"),
//   rooms: Yup.array()
//     .of(
//       Yup.object().shape({
//         type: Yup.string().required("Room type is required"),
//         rate: Yup.number()
//           .positive("Rate must be positive")
//           .required("Rate is required"),
//         capacity: Yup.number()
//           .positive("Capacity must be positive")
//           .required("Capacity is required"),
//         available: Yup.number()
//           .min(0, "Available rooms must be non-negative")
//           .required("Available rooms is required"),
//         amenities: Yup.array()
//           .of(Yup.string())
//           .min(1, "At least one room amenity is required"),
//         availableDates: Yup.array()
//           .of(Yup.date().nullable())
//           .length(2)
//           .required("Available dates are required"),
//       })
//     )
//     .min(1, "At least one room is required"),
// });

export const HotelInformationSchema = Yup.object().shape({
  hotelType: Yup.string().required("Hotel type is required"),
  amenities: Yup.array()
    .of(Yup.string().required("Amenity cannot be empty"))
    .min(1, "At least one amenity is required"),
  rooms: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required("Room type is required"),
        rate: Yup.number()
          .required("Rate is required")
          .min(0, "Rate must be positive"),
        capacity: Yup.number()
          .required("Capacity is required")
          .min(1, "Capacity must be at least 1"),
        available: Yup.number()
          .required("Available rooms is required")
          .min(0, "Available rooms must be non-negative"),
        amenities: Yup.array()
          .of(Yup.string().required("Room amenity cannot be empty"))
          .min(1, "At least one room amenity is required"),
      })
    )
    .min(1, "At least one room is required"),
});
