import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import SearchHotelBar from "./utils/SearchHotelBar";

const Hotel = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="relative flex-grow ">
          <div className="p-7 md:px-2 lg:px-32 xl:px-20">
            <img
              className="h-[290px] w-full object-contain rounded-md"
              src="/images/searchHotel.jpg"
              alt=""
            />
            <SearchHotelBar />
          </div>
        </div>
        <div className="mt-60">
        <Footer />
        </div>
        
      </div>
    </>
  );
};

export default Hotel;
