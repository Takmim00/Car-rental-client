import axios from "axios";
import { useEffect, useState } from "react";

const RecentListing = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars/limit`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="container py-6 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold mb-6">Latest Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={car.images[0]}
              alt={car.carModel}
              className="w-full h-60 object-cover rounded-md"
            />

            <div className="mt-4">
              <h3 className="text-lg font-bold">{car.carModel}</h3>
              <p>
                <span className="text-sm font-medium">Daily Price: </span>
                <span className="text-sm text-gray-500">
                  ${car.dailyRentalPrice}/Day
                </span>
              </p>
              <p>
                <span className="text-sm font-medium">Posted Date:</span>
                <span className="text-sm text-gray-500">
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
                <span className="text-sm font-medium">Location :</span>{" "}
                <span className="text-sm text-gray-500">{car.location}</span>
              </div>
              <p>
                <span className="text-sm font-medium">Booking :</span>{" "}
                <span className="text-sm text-gray-500">
                  {car.bookingCount}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListing;
