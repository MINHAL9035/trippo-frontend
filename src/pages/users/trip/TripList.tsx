import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { Plus } from "lucide-react";
import TripCard from "./utils/TripCard";

const TripList = () => {
  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        {/* Navigation Links */}
        <nav className=" space-x-11 mb-4 md:block hidden">
          <a href="#" className="hover:text-yellow-500 hover:underline">
            Hotels
          </a>
          <a href="#" className="hover:text-yellow-500 hover:underline">
            Things to Do
          </a>
          <a href="#" className="hover:text-yellow-500 hover:underline">
            Restaurants
          </a>
        </nav>
        {/* Adding the hr line below the nav */}
        <hr className="border-t border-gray-300 mb-4 hidden md:block" />

        <h1 className="text-3xl font-bold mb-4">My Trips</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:text-yellow-400">
            <Plus className="mr-2" size={20} /> Create a new trip
          </button>
        </div>

        {/* <div className="flex justify-end mb-4">
          <select className="rounded-md">
            <option>Sort by: Last edited date</option>
          </select>
        </div> */}

        <div className="space-y-4">
          <TripCard
            title="Paris for 3 days"
            duration="3 days"
            location="Paris"
            imageUrl="/src/assets/images/otpImage.png"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TripList;
