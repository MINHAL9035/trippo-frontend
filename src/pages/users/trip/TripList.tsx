import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { Plus } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import handleError from "@/utils/errorHandler";
import { CreateTripResponse } from "@/interface/user/ITripCreation";
import { getTripDetails } from "@/service/api/trip";
import { useAsyncList } from "@react-stately/data";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from "react-router-dom";
import TripCard from "./TripCard";
import CreateTripForm from "./CreateTripForm";

const TripList = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const list = useAsyncList<CreateTripResponse>({
    async load({ cursor }) {
      try {
        const page = cursor ? parseInt(cursor as string) : 1;
        const response = await getTripDetails(userInfo.userId, page);
        return {
          items: response?.data.trips,
          cursor: response?.data.hasMore ? (page + 1).toString() : undefined,
        };
      } catch (error) {
        handleError(error);
        return { items: [] };
      }
    },
  });

  const { ref, inView } = useInView({ rootMargin: "500px" });
  const listRef = useRef(list);

  useEffect(() => {
    listRef.current = list;
    console.log("setting current list......");
  }, [list]);

  useEffect(() => {
    if (listRef.current.items.length && inView && !listRef.current.isLoading) {
      console.log("Loading more....", Date.now());
      listRef.current.loadMore();
    }
  }, [inView]);

  const handleClick = ()=>{
    navigate("/ai-create-trip");
  }
  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        {/* Navigation Links */}
        <nav className="sticky top-16 z-50 space-x-11 mb-4 md:block hidden">
          <Link to="/hotels" className="hover:text-yellow-500 hover:underline">
            Hotels
          </Link>
          <Link to="/explore" className="hover:text-yellow-500 hover:underline">
            Attractions
          </Link>
          <Link to="/explore" className="hover:text-yellow-500 hover:underline">
            Restaurants
          </Link>
        </nav>
        {/* Adding the hr line below the nav */}
        <hr className="sticky top-24 border-t border-gray-300 mb-4 hidden md:block" />

        <h1 className="text-3xl font-bold mb-4">My Trips</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={showDrawer}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:text-yellow-400"
          >
            <Plus className="mr-2" size={20} /> Create a new trip
          </button>
          <button
            onClick={handleClick}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:text-yellow-400"
          >
            <Plus className="mr-2" size={20} /> Create a trip with ai
           </button>
        </div>
        <div className="space-y-9">
          {list.items.length ? (
            list.items.map((trip, index) => (
              <TripCard
                key={index}
                tripName={trip.tripName}
                destination={trip.destination}
                imageUrl={trip.imageUrl}
                tripStartDate={trip.tripStartDate}
                tripEndDate={trip.tripEndDate}
                tripId={trip._id}
                userId={trip.userId}
              />
            ))
          ) : (
            <p>No trips created</p>
          )}
        </div>
        <div ref={ref} className="loading" />
      </div>
      <CreateTripForm open={open} onClose={onClose} />
      <Footer />
    </>
  );
};

export default TripList;
