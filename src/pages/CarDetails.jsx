import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    fetchJobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJobData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/car/${id}`
    );
    setCar(data);
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <img
        src={car.images}
        alt={car}
        className="w-full h-80 object-cover rounded-md mb-4"
      />
      <h2 className="text-3xl font-bold text-gray-800">{car.carModel}</h2>
      <p>{car.description}</p>
      <p className="text-gray-600 ">
        <span className="font-semibold">Price: </span>${car.dailyRentalPrice}
        /Day
      </p>
      <div className="">
        <p className="text-sm text-gray-500 font-semibold">
          Availability:
          <span
            className={
              car.availability === "Available"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {car.availability}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Date: </span>
          {new Date(car.dateAdded).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Features: </span>
          {car.features}
        </p>
        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
