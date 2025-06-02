import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [view, setView] = useState("grid"); // Default to grid view
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/cars?search=${search}&sortBy=${sortBy}&order=${order}`
        );
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
      setLoading(false);
    };
    fetchCars();
  }, [order, search, sortBy]);

  return (
    <div className="container py-12 w-11/12 mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-red-700 mb-10">
        Available Cars
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="ml-4 bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>

        <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-red-400 focus-within:ring-red-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search car model"
            aria-label="Search car model"
          />

          <button className="px-4 md:px-6 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-red-700 rounded-r-md hover:bg-red-800 focus:bg-red-800 focus:outline-none">
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4  items-center">
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

      {cars.length === 0 && !loading && (
        <div className="text-center text-gray-600 text-xl mt-10">
          No cars found matching your criteria.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
        </div>
      ) : (
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
                  ? "bg-white rounded-xl shadow-xl p-4 border-2 border-transparent hover:border-red-400 transition duration-300 ease-in-out transform hover:scale-105"
                  : "flex flex-col md:flex-row items-center space-x-0 md:space-x-6 bg-white shadow-xl rounded-xl p-6 border-2 border-transparent hover:border-red-400 transition duration-300 ease-in-out"
              } hover:cursor-pointer`}
            >
              <img
                src={car.images[0]}
                alt={car.carModel}
                className={`${
                  view === "grid"
                    ? "w-full h-60 object-cover rounded-lg mb-4"
                    : "w-full md:w-1/3 h-64 md:h-52 object-cover rounded-lg mb-4 md:mb-0"
                } transition duration-300 ease-in-out transform `}
              />

              <div className={`${view === "grid" ? "text-start" : "flex-1"}`}>
                <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                  {car.carModel}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{car.carType}</p>

                <p className="mb-1">
                  <span className="text-sm font-medium">Daily Price: </span>
                  <span className="text-sm text-gray-500">
                    ${car.dailyRentalPrice}/Day
                  </span>
                </p>
                <p>
                  <span className="text-sm font-medium">Date Posted:</span>{" "}
                  <span className="text-sm text-gray-600">
                    {new Date(car.dateAdded).toLocaleDateString()}
                  </span>
                </p>
                <div>
                  <span className="text-sm font-medium">Availability: </span>
                  <span
                    className={
                      car.bookingCount > 0
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {car.bookingCount > 0 ? "Unavailable" : "Available"}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium">Location:</span>{" "}
                  <span className="text-sm text-gray-600">{car.location}</span>
                </div>
                <p>
                  <span className="text-sm font-medium">Booking:</span>{" "}
                  <span className="text-sm text-gray-600">
                    {car.bookingCount}
                  </span>
                </p>
                <NavLink to={`/carDetails/${car._id}`}>
                  <button
                    className={`mt-4 w-full text-white py-2 rounded-lg ${
                      car.bookingCount > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={car.bookingCount > 0}
                  >
                    {car.bookingCount > 0 ? "Unavailable" : "Book Now"}
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
