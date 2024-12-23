import axios from "axios";
import { useEffect, useState } from "react";

const RecentListing = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="container py-8 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Latest Cars</h2>
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
              <h3 className="text-lg font-bold">Model :{car.carModel}</h3>
              <p>Daily Price :${car.dailyRentalPrice}/Day</p>
              <p className="text-sm text-gray-500">
                Date Posted :{new Date(car.dateAdded).toLocaleDateString()}
              </p>
              <div className="mt-2 text-green-500 text-sm font-medium">
                Availability :
                {car.availability === "available" ? "Available" : "Unavailable"}
              </div>
              <div className="mt-2 text-sm text-gray-600">{car.location}</div>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListing;
