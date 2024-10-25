import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import { Plus, Minus } from 'lucide-react';
import { HotelDetailsSectionProps } from '@/interface/owner/editHotelInterface';

export const HotelDetailsSection: React.FC<HotelDetailsSectionProps> = ({
  values,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hotel Details</h2>
      <div>
        <label
          htmlFor="hotelType"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hotel Type
        </label>
        <Field
          id="hotelType"
          name="hotelType"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter hotel type"
        />
        <ErrorMessage
          name="hotelType"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Hotel Amenities
        </h3>
        <FieldArray name="amenities">
          {({ remove, push }) => (
            <div>
              {values.amenities.map((_amenity, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Field
                    name={`amenities.${index}`}
                    className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter amenity"
                  />
                  <button
                    type="button"
                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => remove(index)}
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
                Add Amenity
              </button>
            </div>
          )}
        </FieldArray>
        <ErrorMessage
          name="amenities"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};