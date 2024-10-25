import { Users, Mail } from "lucide-react";

interface GuestInformationProps {
  user: {
    fullName: string;
    email: string;
  };
}

const GuestInformation = ({ user }: GuestInformationProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Guest Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <Users className="w-6 h-6 text-blue-500" />
          <div>
            <p className="font-medium text-gray-900">{user.fullName}</p>
            <p className="text-sm text-gray-600">Primary Guest</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <Mail className="w-6 h-6 text-blue-500" />
          <p className="text-gray-900">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default GuestInformation;