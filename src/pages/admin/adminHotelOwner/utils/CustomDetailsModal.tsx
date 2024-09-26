import CustomModal from "@/components/admin/CustomModal";
import { HotelAndOwnerInterface } from "@/interface/owner/IHotelAndOwner.interface";
import { Hotel, User, Mail, Phone, MapPin, Hash } from "lucide-react";
import DetailItem from "./DetailItem";

interface CustomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: HotelAndOwnerInterface | null;
}

const CustomDetailsModal: React.FC<CustomDetailsModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} title="Request Details">
        <div className="p-6 space-y-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-600 px-4 py-3 flex items-center">
              <User className="text-white mr-2" size={24} />
              <h3 className="text-lg font-semibold text-white">
                Owner Details
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={User}
                  label="First Name"
                  value={request?.ownerId.firstName}
                />
                <DetailItem
                  icon={User}
                  label="Last Name"
                  value={request?.ownerId.lastName}
                />
              </div>
              <DetailItem
                icon={Mail}
                label="Email"
                value={request?.ownerId.email}
              />
              <DetailItem
                icon={Phone}
                label="Phone"
                value={request?.ownerId.mobileNumber}
              />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-green-600 px-4 py-3 flex items-center">
              <Hotel className="text-white mr-2" size={24} />
              <h3 className="text-lg font-semibold text-white">
                Hotel Details
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <DetailItem
                icon={Hotel}
                label="Name"
                value={request?.hotelId.hotelName}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={Hash}
                  label="Room Type"
                  value={request?.hotelId.roomType}
                />
                <DetailItem
                  icon={Hash}
                  label="Number of Rooms"
                  value={request?.hotelId.numberOfRooms}
                />
              </div>
              <DetailItem
                icon={MapPin}
                label="Street Address"
                value={request?.hotelId.streetAddress}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailItem
                  icon={MapPin}
                  label="Place"
                  value={request?.hotelId.place}
                />
                <DetailItem
                  icon={MapPin}
                  label="State"
                  value={request?.hotelId.state}
                />
                <DetailItem
                  icon={MapPin}
                  label="Country"
                  value={request?.hotelId.country}
                />
                <DetailItem
                  icon={MapPin}
                  label="Postal Code"
                  value={request?.hotelId.postalCode}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default CustomDetailsModal;
