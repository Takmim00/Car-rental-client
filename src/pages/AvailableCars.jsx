import axios from "axios";
import { useEffect, useState } from "react";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/cars?search=${search}`
      );
      setCars(data);
    };
    fetchCars();
  }, [search]);

  return (
    <div className="container py-8 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Cars</h2>

      <div className="flex items-center justify-between mb-6">
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

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div>

        {/* Toggle View Button */}
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "list"
        } gap-6`}
      >
        {cars.map((car) => (
          <div
            key={car._id}
            className={`${
              view === "grid"
                ? "bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
                : "flex items-start space-x-4 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            }`}
          >
            <img
              src={car.images[0]}
              alt={car.carModel}
              className={`${
                view === "grid"
                  ? "w-full h-60 object-cover rounded-md"
                  : "w-1/3 h-24 object-cover rounded-md"
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
              <div className="mt-2 text-sm text-gray-600">{car.location}</div>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
