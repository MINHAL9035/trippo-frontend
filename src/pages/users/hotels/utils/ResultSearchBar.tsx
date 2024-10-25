import AutocompleteField from "@/components/form/AutocompleteField";
import { setSearchData } from "@/redux/slices/searchSlice";
import { RootState } from "@/redux/store/store";
import { searchHotels } from "@/service/api/user";
import handleError from "@/utils/errorHandler";
import { Users } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResultSearchBar = () => {
  const lastSearch = useSelector((state: RootState) => state.search);
  const today = new Date().toISOString().split("T")[0];

  const [selectedPlace, setSelectedPlace] = useState<string | null>(
    lastSearch.selectedPlace || null
  );
  const [hotelTouched, setHotelTouched] = useState(false);
  const [checkInDate, setCheckInDate] = useState<string | null>(
    lastSearch.checkInDate || null
  );
  const [checkOutDate, setCheckOutDate] = useState<string | null>(
    lastSearch.checkOutDate || null
  );
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceChange = (selectedPlace: string | null) => {
    setSelectedPlace(selectedPlace);
  };
  const handlePlaceBlur = () => {
    setHotelTouched(true);
  };

  const handleCheckInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutDate(event.target.value);
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

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
          {/* Destination Field */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-gray-500">Destination</label>
            <div className="w-full">
              <AutocompleteField
                id="hotel-search"
                placeholder="Where to?"
                value={selectedPlace}
                onChange={handlePlaceChange}
                onBlur={handlePlaceBlur}
                error={
                  hotelTouched && !selectedPlace
                    ? "Place is required"
                    : undefined
                }
                touched={hotelTouched}
              />
            </div>
          </div>

          {/* Check-in Field */}
          <div className="flex-1 min-w-[160px]">
            <label className="text-sm text-gray-500">Check in</label>
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

          {/* Check-out Field */}
          <div className="flex-1 min-w-[160px]">
            <label className="text-sm text-gray-500">Check out</label>
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

          {/* Guests Field */}
          <div className="flex-1 min-w-[200px] relative">
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
            className="w-full sm:w-auto bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultSearchBar;
