import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  Info,
  Wifi,
  Car,
  Coffee,
  Moon,
  SearchIcon,
  UserIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { HotelInterface } from "@/interface/owner/IHotel.Interface";
import handleError from "@/utils/errorHandler";
import {
  getSingleHotelDetails,
  pendingBookings,
  searchHotels,
} from "@/service/api/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePicker, Input } from "antd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AutocompleteField from "@/components/form/AutocompleteField";
import { RootState } from "@/redux/store/store";
import { setSearchData } from "@/redux/slices/searchSlice";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface Child {
  age: number;
}

const HotelDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.hotelId;

  const [activeTab, setActiveTab] = useState("rooms");
  const [hotelDetails, setHotelDetails] = useState<HotelInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const lastSearch = useSelector((state: RootState) => state.search);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

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
    const fetchHotelDetails = async (id: string) => {
      try {
        setLoading(true);
        const response = await getSingleHotelDetails(id);
        setHotelDetails(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails(id);
    }
  }, [id]);

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
        navigate("/search-results", { state: { results: response.data } });
      }
    } catch (error) {
      handleError(error);
    }
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!hotelDetails) {
    return <div>Hotel not found</div>;
  }

  const handleSubmit = async () => {
    try {
      const bookingData = {
        destination: destinationValue,
        checkIn: dateRange[0]?.toISOString(),
        checkOut: dateRange[1]?.toISOString(),
        rooms,
        adults,
        children: children.map((child) => child.age),
        hotelId: id,
        userId: userInfo.userId,
      };
      const response = await pendingBookings(bookingData);
      console.log("dfj",response.data);
      
      if (response.status === 201) {
        navigate("/bookingDetails", {
          state: { bookingId: response.data.bookingId },
        });
      }
      return response;
    } catch (error) {
      handleError(error);
    }
  };

  const images = ["", "", "", ""];

  const amenities = [
    { icon: Wifi, name: "Free WiFi" },
    { icon: Car, name: "Free Parking" },
    { icon: Coffee, name: "Restaurant" },
    { icon: Moon, name: "24/7 Front Desk" },
  ];
  const reviewsList = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Excellent stay, beautiful surroundings!",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Great experience, but the food could be improved.",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "rooms":
        return (
          <div className="border rounded-lg p-6 mb-6 hover: transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {hotelDetails.roomType}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{hotelDetails.price}</p>
                <button
                  onClick={handleSubmit}
                  className="mt-2 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-300"
                >
                  SELECT ROOM
                </button>
              </div>
            </div>
          </div>
        );
      case "amenities":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <amenity.icon className="text-blue-500 mb-2" size={24} />
                <span className="text-center">{amenity.name}</span>
              </div>
            ))}
          </div>
        );
      case "reviews":
        return reviewsList.map((review, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{review.name}</h3>
              <div className="flex items-center">
                <span className="mr-1">{review.rating}</span>
                <Star
                  className="text-yellow-400"
                  size={16}
                  fill="currentColor"
                />
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ));
      default:
        return null;
    }
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
      <div className="bg-gray-100 min-h-screen p-4">
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
                  <Button variant="outline" className="w-full justify-between">
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

        <div className="max-w-6xl mx-auto bg-white rounded-xl  overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {hotelDetails.hotelName}
                </h1>
                <p className="text-gray-600">{hotelDetails.place}</p>
              </div>
              {/* <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded">
                <span className="font-bold mr-1">{rating}</span>
                <Star size={16} fill="currentColor" />
                <span className="ml-2 text-sm">({reviews} reviews)</span>
              </div> */}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <img
                src="/src/assets/images/hotelimage.jpeg"
                alt="Main hotel view"
                className="col-span-2 w-full h-80 object-cover rounded-lg"
              />
              <div className="grid grid-rows-2 gap-4">
                {images.slice(1, 3).map((index) => (
                  <img
                    key={index}
                    src="/src/assets/images/hotelimage.jpeg"
                    alt={`Hotel image ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About the Resort</h2>
              <p className="text-gray-600 mb-4">
                This property is a luxurious resort nestled in the picturesque
                hills of Munnar, offering a perfect blend of nature and comfort.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full">
                  <Info className="text-blue-500 mr-2" size={20} />
                  <span className="text-gray-700">Vaccinated staff</span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full">
                  <Info className="text-blue-500 mr-2" size={20} />
                  <span className="text-gray-700">
                    Sanitized before your stay
                  </span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full">
                  <Info className="text-blue-500 mr-2" size={20} />
                  <span className="text-gray-700">
                    Contactless check-in available
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex border-b">
                {["rooms", "amenities", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetails;
