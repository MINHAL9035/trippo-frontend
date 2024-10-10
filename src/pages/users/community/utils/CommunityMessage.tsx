import { MessageCircle, Video, Info } from "lucide-react";

const CommunityMessage = () => {
  return (
    <div className="flex flex-col rounded-lg w-full bg-white">
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src="/src/assets/images/explore.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div className="flex-grow">
          <h2 className="text-sm font-semibold">_minhaaal._</h2>
          <p className="text-xs text-gray-500">Instagram</p>
        </div>
        <div className="flex space-x-2">
          <MessageCircle size={20} className="text-gray-500" />
          <Video size={20} className="text-gray-500" />
          <Info size={20} className="text-gray-500" />
        </div>
      </div>
      <div className="p-4">
        <img
          src="/src/assets/images/home1.jpg"
          alt="Community content"
          className=" w-10 h-10 object-cover rounded-md mb-3"
        />
        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300">
          View Profile
        </button>
      </div>
      <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
        Mon 8:21 PM
      </div>
    </div>
  );
};

export default CommunityMessage;
