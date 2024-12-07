import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import { Search, RotateCcw, Tag } from "lucide-react";
import List from "./utils/List";
import { useEffect, useState } from "react";
import { getPlacesData } from "@/service/api/explore";
import {
  Bounds,
  Coordinates,
  IExplorePlaces,
} from "@/interface/user/explore.interface";
import { Autocomplete } from "@react-google-maps/api";
import Map from "./utils/Map";

// Define types for the Autocomplete
type AutocompleteType = google.maps.places.Autocomplete | null;

const Explore = () => {
  const [places, setPlaces] = useState<IExplorePlaces[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<IExplorePlaces[]>([]);
  const [coords, setCoords] = useState<Coordinates>({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState<AutocompleteType>(null);

  const onLoad = (autoC: google.maps.places.Autocomplete): void => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoords({ lat, lng });
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filtered);
  }, [places, rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds).then((data) => {
        setPlaces(data);
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds, coords, type]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <div className="relative">
        <img
          className="h-[300px] sm:h-[400px] md:h-[400px] w-full object-cover"
          src="images/tripImages/explore.jpg"
          alt="Explore background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-center">
            Wander, Explore, and Find Your <br className="hidden md:block" />
            Next Destination
          </h1>
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-4">
            <div className="relative">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div>
                  <input
                    type="text"
                    placeholder="Search by destination, attraction or activity"
                    className="w-full py-2 sm:py-3 px-3 sm:px-4 pr-10 rounded-md bg-white text-black text-sm sm:text-base"
                  />
                  <Search
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </Autocomplete>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-4 sm:mt-8 gap-24">
            {[
              {
                icon: Search,
                text: "See what people loved with real reviews",
              },
              {
                icon: RotateCcw,
                text: "24-hour cancellation available",
              },
              {
                icon: Tag,
                text: "Budget-friendly options",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-24 sm:w-32"
              >
                <div className="bg-white rounded-full p-2 sm:p-3 mb-2 hover:bg-yellow-400 transition-colors">
                  <item.icon className="text-black" size={16} />
                </div>
                <p className="text-center text-xs sm:text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* List Section */}
        <div className="order-2 lg:order-1 overflow-y-auto">
          <List
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </div>

        {/* Map Section */}
        <div className="order-1 m-5 rounded-md lg:order-2 min-h-[400px] lg:min-h-full sticky top-0">
          <Map setBounds={setBounds} setCoords={setCoords} coords={coords} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
