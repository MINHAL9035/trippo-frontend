import React from "react";
import { Field, ErrorMessage } from "formik";
import { RoomFieldsGroupProps } from "@/interface/owner/editHotelInterface";

export const RoomFieldsGroup: React.FC<RoomFieldsGroupProps> = ({
  index,
  room,
  setFieldValue,
}) => {
  return (
    <>
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
          htmlFor={`rooms.${index}.availableDates[0]`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Start Date
        </label>
        <Field
          type="date"
          name={`rooms.${index}.availableDates[0]`}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={
            room.availableDates[0]
              ? new Date(room.availableDates[0]).toISOString().split("T")[0]
              : ""
          }
          min={new Date().toISOString().split("T")[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(`rooms.${index}.availableDates[0]`, e.target.value)
          }
        />
        <ErrorMessage
          name={`rooms.${index}.availableDates[0]`}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div className="col-span-2">
        <label
          htmlFor={`rooms.${index}.availableDates[1]`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          End Date
        </label>
        <Field
          type="date"
          name={`rooms.${index}.availableDates[1]`}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={
            room.availableDates[1]
              ? new Date(room.availableDates[1]).toISOString().split("T")[0]
              : ""
          }
          min={new Date().toISOString().split("T")[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(`rooms.${index}.availableDates[1]`, e.target.value)
          }
        />
        <ErrorMessage
          name={`rooms.${index}.availableDates[1]`}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </>
  );
};
