import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import ResultSearchBar from "./utils/ResultSearchBar";
import ResultHotelListing from "./utils/ResultHotelListing";

const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<HotelInterface[]>([]);

  useEffect(() => {
    if (location.state?.results) {
      setSearchResults(location.state.results);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">
        {/* Search Bar Section */}
        <div>
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <ResultSearchBar />
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {searchResults.map((hotel, index) => (
                <ResultHotelListing key={hotel._id || index} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No results found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
