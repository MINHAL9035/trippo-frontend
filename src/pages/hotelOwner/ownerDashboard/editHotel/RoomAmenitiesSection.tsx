import React from 'react';
import { FieldArray, Field, ErrorMessage } from 'formik';
import { Plus, Minus } from 'lucide-react';
import { RoomAmenitiesSectionProps } from '@/interface/owner/editHotelInterface';

export const RoomAmenitiesSection: React.FC<RoomAmenitiesSectionProps> = ({
  index,
  room,
}) => {
  return (
    <div className="mt-4">
      <h4 className="text-md font-medium mb-2">Room Amenities</h4>
      <FieldArray name={`rooms.${index}.amenities`}>
        {({ remove, push }) => (
          <div>
            {room.amenities.map((_, amenityIndex) => (
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
                  onClick={() => remove(amenityIndex)}
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
  );
};