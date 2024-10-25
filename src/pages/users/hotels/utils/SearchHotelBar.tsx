import { Users } from "lucide-react";
import { useState } from "react";
import AutocompleteField from "@/components/form/AutocompleteField";
import { searchHotels } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "@/redux/slices/searchSlice";

const SearchHotelBar = () => {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [hotelTouched, setHotelTouched] = useState(false);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([0]);

  const today = new Date().toISOString().split("T")[0];

  const handleHotelChange = (selectedPlace: string | null) => {
    setSelectedPlace(selectedPlace);
  };

  const handleHotelBlur = () => {
    setHotelTouched(true);
  };

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutDate(event.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const searchData = {
        selectedPlace,
        checkInDate,
        checkOutDate,
        guests: {
          adults,
          children,
          childrenAges,
          rooms,
        },
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

  const updateChildrenAges = (index: number, age: number) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  const handleChildrenChange = (newValue: number) => {
    setChildren(newValue);
    if (newValue > childrenAges.length) {
      setChildrenAges([
        ...childrenAges,
        ...Array(newValue - childrenAges.length).fill(0),
      ]);
    } else {
      setChildrenAges(childrenAges.slice(0, newValue));
    }
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-5 translate-y-1/2 w-[100%] max-w-6xl z-50">
      <div className="bg-white rounded-lg shadow-md p-3 relative">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Location Search */}
          <div className="flex-1 w-full relative">
            <label className="text-sm text-gray-500">Destination</label>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <AutocompleteField
                  id="hotel-search"
                  placeholder="Where to?"
                  value={selectedPlace}
                  onChange={handleHotelChange}
                  onBlur={handleHotelBlur}
                  error={
                    hotelTouched && !selectedPlace
                      ? "Place is required"
                      : undefined
                  }
                  touched={hotelTouched}
                />
              </div>
            </div>
          </div>

          {/* Check-in */}
          <div className="flex-1 w-full">
            <label className="text-sm text-gray-500 ml-2">Check in</label>
            <div className="flex items-center gap-2 border-b">
              <input
                type="date"
                placeholder="--/--/----"
                className="w-full p-2 outline-none"
                min={today}
                value={checkInDate || ""}
                onChange={handleCheckInChange}
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 w-full">
            <label className="text-sm text-gray-500 ml-2">Check out</label>
            <div className="flex items-center gap-2 border-b">
              <input
                type="date"
                placeholder="--/--/----"
                className="w-full p-2 outline-none"
                min={today}
                value={checkOutDate || ""}
                onChange={handleCheckOutChange}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 w-full relative">
            <label className="text-sm text-gray-500">Guests and rooms</label>
            <div
              className="flex items-center gap-2 border-b cursor-pointer"
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            >
              <Users className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                readOnly
                value={`${adults + children} Guests, ${rooms} Room${
                  rooms > 1 ? "s" : ""
                }`}
                className="w-full p-2 outline-none cursor-pointer"
              />
            </div>

            {/* Guests Dropdown */}
            {showGuestDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-lg rounded-md p-4 z-50">
                {/* Adults */}
                <div className="flex items-center justify-between mb-4">
                  <span>Adults</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-500"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{adults}</span>
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-500"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between mb-4">
                  <span>Children</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-500"
                      onClick={() =>
                        handleChildrenChange(Math.max(0, children - 1))
                      }
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{children}</span>
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-500"
                      onClick={() => handleChildrenChange(children + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between mb-4">
                  <span>Rooms</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-500"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{rooms}</span>
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-500"
                      onClick={() => setRooms(rooms + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children's Ages */}
                {children > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Children's ages (Required)
                    </h4>
                    {Array.from({ length: children }).map((_, index) => (
                      <div key={index} className="mb-2">
                        <label className="text-sm text-gray-500">
                          Child {index + 1}
                        </label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={childrenAges[index]}
                          onChange={(e) =>
                            updateChildrenAges(index, parseInt(e.target.value))
                          }
                        >
                          {Array.from({ length: 18 }).map((_, age) => (
                            <option key={age} value={age}>
                              {age} years
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}

                {/* Apply Button */}
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <button
                    className="text-gray-500"
                    onClick={() => {
                      setAdults(2);
                      handleChildrenChange(0);
                      setRooms(1);
                    }}
                  >
                    RESET
                  </button>
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md"
                    onClick={() => setShowGuestDropdown(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHotelBar;
