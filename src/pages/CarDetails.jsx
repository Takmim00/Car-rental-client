import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";

const CarDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const { id } = useParams();
  const [car, setCar] = useState({});
  useEffect(() => {
    fetchJobData();
  }, [id]);

  const fetchJobData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/car/${id}`
    );
    setCar(data);
  };
  const handleBooking = async (e) => {
    e.preventDefault();

    if (user?.email === car?.email) return toast.error("Action not permitted!");
    const bookingDate = format(new Date().toLocaleDateString(), "dd-MM-yyyy ");
    const bookingDetails = {
      carId: car._id,
      userEmail: user.email,
      carModel: car.carModel,
      dailyRentalPrice: car.dailyRentalPrice,
      bookingDate,
      image: car.images[0],
      status: "Pending",
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/addBooking`,
        bookingDetails
      );

      toast.success("Data Added Successfully!!!");
      navigate("/myBooking");
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 w-11/12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Image Section */}
        <div className="md:w-1/2">
          
          <img
            src={car.images?.[0]}
            alt={car.carModel}
            className="w-full  object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {car.carModel}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {car.description}
            </p>

            <p className="text-2xl font-semibold text-red-600 mb-4">
              ${car.dailyRentalPrice}/Day
            </p>

            <div className="mb-4">
              <span className="text-lg font-semibold text-gray-800 mr-2">
                Availability:
              </span>
              <span
                className={`text-lg font-bold ${
                  car.availability === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {car.availability}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-2">
              <span className="font-semibold">Date Added:</span>{" "}
              {car.dateAdded
                ? new Date(car.dateAdded).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600 text-sm mb-4">
              <span className="font-semibold">Features:</span> {car.features}
            </p>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-xl font-semibold transition duration-300 ease-in-out"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
