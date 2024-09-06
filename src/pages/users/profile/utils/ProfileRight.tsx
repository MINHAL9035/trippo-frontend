import { IUser } from "@/interface/user/IUser.interface";
import React from "react";
import { MdEditNote } from "react-icons/md";
import EditModal from "./EditModal";

interface ProfileRightProps {
  userProfile: IUser | null;
}

const ProfileRight = ({ userProfile }: ProfileRightProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <div className=" rounded-lg border  p-6 w-full md:w-1/3">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={userProfile?.image}
              alt="No image"
              className="w-32 h-32 rounded-xl"
            />
            <div className="absolute bottom-28 right-0 bg-yellow-500 rounded-full p-1">
              <MdEditNote onClick={showLoading} />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold">
            {userProfile?.firstName} {userProfile?.lastName}
          </h2>
          <p className="text-gray-500 text-sm">{userProfile?.email}</p>
          <div className="flex justify-between w-full mt-4">
            <div className="text-center">
              <p className="font-bold">0</p>
              <p className="text-sm text-gray-500">posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold">0</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">1</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Kozhikode , India</span>
          </div>
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Joined in Jun 2024</span>
          </div>
          <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium ">
            Add a website
          </button>
          <button className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium  ">
            Write some details about yourself
          </button>
          <h3 className="mt-6 mb-2 font-semibold">Share your travel advice</h3>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium   mb-2">
            Post photos
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium  ">
            Write review
          </button>
        </div>
      </div>
      <EditModal
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        UserProfile={userProfile}
      />
    </>
  );
};

export default ProfileRight;
