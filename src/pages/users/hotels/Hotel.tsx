import React, { useState } from "react";
import { SearchIcon, UserIcon, MinusIcon, PlusIcon } from "lucide-react";
import { DatePicker, Input } from "antd";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import AutocompleteField from "@/components/form/AutocompleteField";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import handleError from "@/utils/errorHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "@/redux/slices/searchSlice";
import { searchHotels } from "@/service/api/user";
const { RangePicker } = DatePicker;

interface Child {
  age: number;
}

const Hotel: React.FC = () => {
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<Child[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [destinationValue, setDestinationValue] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoomChange = (value: number) => {
    setRooms(Math.max(1, value));
  };

  const handleAdultChange = (value: number) => {
    setAdults(Math.max(1, value));
  };

  const handleChildAdd = () => {
    setChildren([...children, { age: 0 }]);
  };

  const handleChildRemove = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleChildAgeChange = (index: number, value: number) => {
    const newChildren = [...children];
    newChildren[index].age = value;
    setChildren(newChildren);
  };

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
    <div className="bg-gray-50 min-h-screen">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Find Your Perfect Stay
        </h2>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                onChange={(dates) =>
                  setDateRange(dates as [Date | null, Date | null])
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
                <SearchIcon className="mr-2 h-4 w-4" /> Search Hotels
              </Button>
            </div>
          </CardContent>
        </Card>

        <section>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Top Rated Hotels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src="/src/assets/images/hotelimage.jpeg"
                  alt={`Hotel ${i + 1}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">
                    Luxury Hotel {i + 1}
                  </h4>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {1000 + i * 500} reviews
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Exquisite comfort • Prime location
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hotel;
