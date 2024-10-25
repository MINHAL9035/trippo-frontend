import React from "react";
import { X } from "lucide-react";
import { ImageSectionProps } from "@/interface/owner/editHotelInterface";

export const ImageSection: React.FC<ImageSectionProps> = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  onImageUpload,
  onImageRemove,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Hotel Images</h2>
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          className="mb-4"
        />
        {images.length > 0 && (
          <div className="relative w-full max-w-md">
            <img
              src={images[currentImageIndex].preview}
              alt={`Hotel preview ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onImageRemove(currentImageIndex)}
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {images.length > 1 && (
          <div className="flex justify-center mt-2 space-x-2">
            <button
              type="button"
              onClick={() =>
                setCurrentImageIndex(
                  currentImageIndex === 0
                    ? images.length - 1
                    : currentImageIndex - 1
                )
              }
              disabled={images.length === 0}
              className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentImageIndex((currentImageIndex + 1) % images.length);
              }}
              disabled={images.length === 0}
              className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
