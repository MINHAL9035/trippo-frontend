import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Coffee,
  SearchIcon,
  UserIcon,
  MinusIcon,
  PlusIcon,
  Wifi,
  ParkingCircle,
} from "lucide-react";
import { DatePicker, Input } from "antd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AutocompleteField from "@/components/form/AutocompleteField";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import handleError from "@/utils/errorHandler";
import { RootState } from "@/redux/store/store";
import { setSearchData } from "@/redux/slices/searchSlice";
import { searchHotels } from "@/service/api/user";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import dayjs from "dayjs";
import { MdPool } from "react-icons/md";

const { RangePicker } = DatePicker;

interface Child {
  age: number;
}

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<HotelInterface[]>([]);
  const lastSearch = useSelector((state: RootState) => state.search);
  const [destinationValue, setDestinationValue] = useState<string>(
    lastSearch.destination || ""
  );
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([
    lastSearch.checkIn ? dayjs(lastSearch.checkIn) : null,
    lastSearch.checkOut ? dayjs(lastSearch.checkOut) : null,
  ]);
  const [rooms, setRooms] = useState<number>(lastSearch.rooms || 1);
  const [adults, setAdults] = useState<number>(lastSearch.adults || 2);
  const [children, setChildren] = useState<Child[]>(
    lastSearch.children?.map((age: number) => ({ age })) || []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.results) {
      setSearchResults(location.state.results);
    }
  }, [location.state]);

  const handleSearch = async () => {
    try {
      const searchData = {
        destination: destinationValue,
        checkIn: dateRange[0]?.toISOString() || null,
        checkOut: dateRange[1]?.toISOString() || null,
        rooms,
        adults,
        children: children.map((child) => child.age),
      };
      const response = await searchHotels(searchData);

      if (response.status === 201) {
        dispatch(setSearchData(searchData));
        setSearchResults(response.data);
        navigate("/search-results", { state: { results: response.data } });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleClick = () => {
    searchResults.map((hotel) => {
      return hotel._id;
    });
    const hotelId = searchResults[0]?._id;
    navigate("/hotelDetails", { state: { hotelId: hotelId } });
  };

  const handleRoomChange = (value: number) => setRooms(Math.max(1, value));
  const handleAdultChange = (value: number) => setAdults(Math.max(1, value));
  const handleChildAdd = () => setChildren([...children, { age: 0 }]);
  const handleChildRemove = (index: number) =>
    setChildren(children.filter((_, i) => i !== index));
  const handleChildAgeChange = (index: number, value: number) => {
    const newChildren = [...children];
    newChildren[index].age = value;
    setChildren(newChildren);
  };

  const GuestSelector: React.FC = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">Rooms</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleRoomChange(rooms - 1)}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{rooms}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleRoomChange(rooms + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Adults</span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleAdultChange(adults - 1)}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{adults}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleAdultChange(adults + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">Children</span>
          <Button variant="outline" size="sm" onClick={handleChildAdd}>
            <PlusIcon className="h-4 w-4 mr-2" /> Add child
          </Button>
        </div>
        {children.map((child, index) => (
          <div key={index} className="flex items-center justify-between">
            <Input
              type="number"
              min={0}
              max={17}
              value={child.age}
              onChange={(e) =>
                handleChildAgeChange(index, parseInt(e.target.value))
              }
              className="w-20"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleChildRemove(index)}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button className="w-full" onClick={() => setIsOpen(false)}>
        Apply
      </Button>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 shadow-lg">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AutocompleteField
                  id="place"
                  label=""
                  placeholder="Search for a place"
                  value={destinationValue}
                  onChange={(selectedPlace) =>
                    setDestinationValue(selectedPlace || "")
                  }
                  onBlur={() => {}}
                  error={""}
                  touched={false}
                />
                <RangePicker
                  className="w-full h-10"
                  value={dateRange}
                  onChange={(dates) =>
                    setDateRange(
                      dates as [dayjs.Dayjs | null, dayjs.Dayjs | null]
                    )
                  }
                />
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span>
                        {rooms} Room{rooms > 1 ? "s" : ""},{" "}
                        {adults + children.length} Guest
                        {adults + children.length > 1 ? "s" : ""}
                      </span>
                      <UserIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <GuestSelector />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <SearchIcon className="mr-2 h-4 w-4" /> Update Search
                </Button>
              </div>
            </div>
          </Card>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((hotel, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src="/src/assets/images/hotelimage.jpeg"
                        alt={hotel.hotelName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-800 mb-2">
                            {hotel.hotelName}
                          </h3>
                          {/* <div className="flex items-center mb-2">
                            <Rate
                              disabled
                              defaultValue={4}
                              className="text-yellow-400"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              4.0 (250 reviews)
                            </span>
                          </div> */}
                          <p className="text-sm text-gray-600 flex items-center mb-2">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />{" "}
                            {hotel.place}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">
                            Price per night
                          </p>
                          <p className="font-bold text-3xl text-gray-800 mb-2">
                            ₹{hotel.price}
                          </p>
                          {/* <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                            View deal
                          </Button> */}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Coffee className="w-4 h-4 mr-2 text-gray-400" />{" "}
                          Breakfast included
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Wifi className="w-4 h-4 mr-2 text-gray-400" /> Free
                          WiFi
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ParkingCircle className="w-4 h-4 mr-2 text-gray-400" />{" "}
                          Free parking
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MdPool className="w-4 h-4 mr-2 text-gray-400" />{" "}
                          Swimming pool
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        Experience luxury and comfort at {hotel.hotelName}. Our
                        spacious rooms, excellent amenities, and prime location
                        make us the perfect choice for your stay in{" "}
                        {hotel.place}.
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          Only 3 rooms left at this price
                        </p>

                        <Button
                          onClick={handleClick}
                          variant="outline"
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          More details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                No hotels found for this destination
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or exploring a different
                location.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
