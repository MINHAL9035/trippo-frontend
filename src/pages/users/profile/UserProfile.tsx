import NavBar from "@/components/user/NavBar";
import { IUser } from "@/interface/user/IUser.interface";
import { RootState } from "@/redux/store/store";
import {} from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProfileRight from "./utils/ProfileRight";
import ProfileBottom from "./utils/ProfileBottom";
import Footer from "@/components/user/Footer";
import { userDetails } from "@/service/api/userProfileApi";

const UserProfile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  const hasFetchedUserProfile = useRef(false);

  useEffect(() => {
    if (userInfo.email && !hasFetchedUserProfile.current) {
      hasFetchedUserProfile.current = true;
      (async (email: string) => {
        try {
          const response = await userDetails(email);
          setUserProfile(response.data);
        } catch (error) {
          handleError(error);
        }
      })(userInfo.email);
    }
  }, [userInfo.email]);
  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row gap-6 p-6 ">
        <ProfileRight userProfile={userProfile} />
        <div className="w-full h-screen ">
          <ProfileBottom />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
