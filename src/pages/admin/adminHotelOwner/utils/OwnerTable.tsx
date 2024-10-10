import { Owner } from "@/interface/owner/IOwner.interface";
import { getOwners } from "@/service/api/admin";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";

const OwnerTable = () => {
  const [owners, setOwners] = useState<Owner[]>([]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await getOwners();
      const { owners } = response.data as { owners: Owner[] };
      setOwners(owners);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto  rounded-lg m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                first Name
              </th>
              <th scope="col" className="px-6 py-3">
                last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile 
              </th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr
                key={owner._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium">{owner.firstName}</td>
                <td className="px-6 py-4 font-medium">{owner.lastName}</td>
                <td className="px-6 py-4">{owner.email}</td>
                <td className="px-6 py-4">{owner.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OwnerTable;
