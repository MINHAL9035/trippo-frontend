import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import SearchHotelBar from "./utils/SearchHotelBar";

const Hotel = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="relative flex-grow">
          <div className="p-7 md:px-20 lg:px-32 xl:px-20">
            <img
              className="h-[290px] w-full object-cover rounded-md"
              src="images/explore.jpg"
              alt=""
            />
            <SearchHotelBar />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Hotel;
