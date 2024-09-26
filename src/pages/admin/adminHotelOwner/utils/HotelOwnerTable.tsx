import { useState, useEffect } from "react";
import { getRequest, updateOwnerStatus } from "@/service/api/admin";
import { HotelAndOwnerInterface } from "@/interface/owner/IHotelAndOwner.interface";
import handleError from "@/utils/errorHandler";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import { Alert, message, Popconfirm } from "antd";
import CustomDetailsModal from "./CustomDetailsModal";

const HotelOwnerTable = () => {
  const [requests, setRequests] = useState<HotelAndOwnerInterface[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<HotelAndOwnerInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await getRequest();
      if (response.status === 200) {
        setRequests(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleViewDetails = (request: HotelAndOwnerInterface) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleUpdateStatus = async (
    ownerId: string,
    action: "accepted" | "rejected"
  ) => {
    try {
      const response = await updateOwnerStatus(ownerId, action);
      if (response.status === 200) {
        message.success(
          `Request ${
            action === "accepted" ? "accepted" : "rejected"
          } successfully`
        );
        fetchRequests();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Hotel Owner Requests
            </h2>
          </div>
          <div className="shadow overflow-hidden rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100 shadow-md">
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hotel Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="bg-white hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {request.ownerId.firstName} {request.ownerId.lastName}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {request.ownerId.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {request.hotelId.hotelName}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <Alert
                        message={
                          request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)
                        }
                        type={
                          request.status === "pending"
                            ? "info"
                            : request.status === "approved"
                            ? "success"
                            : "error"
                        }
                        showIcon
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex space-x-2">
                        <Popconfirm
                          title="Are you sure you want to accept this request?"
                          onConfirm={() =>
                            handleUpdateStatus(request.ownerId._id, "accepted")
                          }
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-900"
                            disabled={request.status !== "pending"}
                          >
                            <Check size={20} />
                          </Button>
                        </Popconfirm>
                        <Popconfirm
                          title="Are you sure you want to reject this request?"
                          onConfirm={() =>
                            handleUpdateStatus(request.ownerId._id, "rejected")
                          }
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-900"
                            disabled={request.status !== "pending"}
                          >
                            <X size={20} />
                          </Button>
                        </Popconfirm>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye size={20} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CustomDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
      />
    </>
  );
};

export default HotelOwnerTable;
