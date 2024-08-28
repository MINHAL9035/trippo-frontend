import NavBar from "@/components/user/NavBar";
import { IUser } from "@/interface/user/IUser.interface";
import { RootState } from "@/redux/store/store";
import { userDetails } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      console.log("Calling fetchUser with email:", userInfo);
      fetchUser(userInfo);
    } else {
      console.log("No email found in userInfo");
    }
  }, [userInfo]);

  const fetchUser = async (email: string) => {
    try {
      console.log("hi");
      const response = await userDetails(email);
      console.log("fdgfd0", response.data);
      setUserProfile(response.data);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row gap-6 p-6 ">
        {/* Left column - User info */}
        <div className=" rounded-lg shadow-md p-6 w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={userProfile?.image}
                alt="No image"
                className="w-32 h-32 rounded-full"
              />
              <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
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
            <h3 className="mt-6 mb-2 font-semibold">
              Share your travel advice
            </h3>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium   mb-2">
              Post photos
            </button>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium  ">
              Write review
            </button>
          </div>
        </div>

        {/* Right column - Achievements and Activity */}
        <div className="w-full md:w-2/3">
          <div className=" border-red-500 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            <p className="text-sm text-gray-500 mb-4">
              Start sharing to unlock
            </p>
            <div className="flex gap-4">
              <div className="flex-1 border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Write your first review
                  </span>
                </div>
              </div>
              <div className="flex-1 border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Upload your first photo
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-md p-6">
            <div className="border-b pb-4 mb-4">
              <button className="mr-4 text-yellow-500 font-medium">
                Activity feed
              </button>
              <button className="mr-4 text-gray-500">Trips</button>
              <button className="mr-4 text-gray-500">Account info</button>
              <button className="mr-4 text-gray-500">Photos</button>
              <button className="mr-4 text-gray-500">Reviews</button>
              <button className="text-gray-500">Travel map</button>
            </div>
            <div className="flex justify-center items-center h-[320px]  rounded-lg">
              <div className="text-center">
                <h3 className="font-semibold mb-2">
                  Build Your Travel Identity
                </h3>
                <p className="text-sm text-gray-500">
                  Include photos and reviews to make it easier for people to
                  find and connect with you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
