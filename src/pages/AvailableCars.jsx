import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/cars?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      setCars(data);
    };
    fetchCars();
  }, [order, search, sortBy]);

  return (
    <div className="container py-8 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Cars</h2>

      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Toggle View Button */}
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
        {/* search */}
        <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Enter Job Title"
            aria-label="Enter Job Title"
          />

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
            Search
          </button>
        </div>

        <div className="mb-4 flex gap-4 items-center">
          {/* Date Sorting */}
          <div>
            <select
              className="border p-2 rounded"
              defaultValue=""
              onChange={(e) => {
                const [field, orderValue] = e.target.value.split("-");
                setSortBy(field);
                setOrder(orderValue);
              }}
            >
              <option value="" disabled>
                Sort by Date
              </option>
              <option value="dateAdded-desc">Newest Date</option>
              <option value="dateAdded-asc">Oldest Date</option>
            </select>
          </div>

          {/* Price Sorting */}
          <div>
            <select
              className="border p-2 rounded"
              defaultValue=""
              onChange={(e) => {
                const [field, orderValue] = e.target.value.split("-");
                setSortBy(field);
                setOrder(orderValue);
              }}
            >
              <option value="" disabled>
                Sort by Price
              </option>
              <option value="dailyRentalPrice-asc">Lowest Price</option>
              <option value="dailyRentalPrice-desc">Highest Price</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "list space-y-3"
        } gap-6`}
      >
        {cars.map((car) => (
          <div
            key={car._id}
            className={`${
              view === "grid"
                ? "bg-white rounded-lg shadow-md p-4 "
                : "flex items-start space-x-4 bg-white shadow-md rounded-lg p-4 "
            }`}
          >
            <img
              src={car.images[0]}
              alt={car.carModel}
              className={`${
                view === "grid"
                  ? "w-full h-60 object-cover rounded-md"
                  : "w-1/3 h-44 object-cover rounded-md"
              }`}
            />

            <div className={`${view === "grid" ? "mt-4" : ""}`}>
              <h3 className="text-lg font-bold">{car.carModel}</h3>
              <p>Daily Price: ${car.dailyRentalPrice}/Day</p>
              <p className="text-sm text-gray-500">
                Date Posted: {new Date(car.dateAdded).toLocaleDateString()}
              </p>
              <div className="mt-2  text-sm font-medium">
                Availability:{" "}
                <span
                  className={
                    car.availability === "Available"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {car.availability}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">Location:{car.location}</div>
              <NavLink to={`/carDetails/${car._id}`}>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                  Book Now
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
