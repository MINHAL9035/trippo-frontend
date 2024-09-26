import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { Link } from "react-router-dom";

const TripDetails = () => {
  return (
    <>
      <NavBar />
      <nav className=" space-x-11  md:block hidden">
        <Link to="/hotels">
          <p className="hover:text-yellow-500 hover:underline">Hotels</p>
        </Link>
        <a href="#" className="hover:text-yellow-500 hover:underline">
          Things to Do
        </a>
        <a href="#" className="hover:text-yellow-500 hover:underline">
          Restaurants
        </a>
      </nav>
      <Footer />
    </>
  );
};

export default TripDetails;
