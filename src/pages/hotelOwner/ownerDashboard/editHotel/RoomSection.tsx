import React from "react";
import { Field, FieldArray, ErrorMessage } from "formik";
import { Plus } from "lucide-react";
import { RoomSectionProps } from "@/interface/owner/editHotelInterface";
import { RoomFieldsGroup } from "./RoomFieldsGroup";
import { RoomAmenitiesSection } from "./RoomAmenitiesSection";

export const RoomSection: React.FC<RoomSectionProps> = ({
  values,
  setFieldValue,
}) => {
  return (
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
                <h3 className="text-lg font-medium mb-2">Room {index + 1}</h3>
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
                  <RoomFieldsGroup
                    index={index}
                    room={room}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <RoomAmenitiesSection index={index} room={room} />
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
  );
};
