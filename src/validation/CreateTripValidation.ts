import * as yup from "yup";
import moment from "moment";

const isValidDate = (value: string | undefined): boolean => {
  if (typeof value === "string") {
    return moment(value, "DD-MM-YYYY", true).isValid();
  }
  return false;
};

export const createTripSchema = yup.object().shape({
  tripName: yup
    .string()
    .min(3, "Trip name must be at least 3 characters")
    .max(100, "Trip name can't exceed 100 characters")
    .required("Trip name is required"),
  destination: yup
    .string()
    .min(2, "Destination must be at least 2 characters")
    .max(100, "Destination can't exceed 100 characters")
    .required("Destination is required"),
  tripImage: yup.mixed<File>().required("Trip image is required"),
  tripDate: yup
    .tuple([
      yup
        .string()
        .test("is-date-string", "Invalid date format", isValidDate)
        .test(
          "is-future-date",
          "Trip start date must be today or later",
          (value) =>
            value
              ? moment(value, "DD-MM-YYYY").isSameOrAfter(
                  moment().startOf("day")
                )
              : false
        )
        .required(),
      yup
        .string()
        .test("is-date-string", "Invalid date format", isValidDate)
        .test(
          "is-future-date",
          "Trip end date must be today or later",
          (value) =>
            value
              ? moment(value, "DD-MM-YYYY").isSameOrAfter(
                  moment().startOf("day")
                )
              : false
        )
        .required(),
    ])
    .test("date-order", "End date must be after start date", function (value) {
      if (value && value.length === 2) {
        const [start, end] = value;
        return moment(end, "DD-MM-YYYY").isSameOrAfter(
          moment(start, "DD-MM-YYYY")
        );
      }
      return true;
    })
    .required("Trip dates are required"),
});
