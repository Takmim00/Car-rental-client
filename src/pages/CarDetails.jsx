import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";
import { format } from "date-fns";

const CarDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
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
  const handleBooking = async (e) => {
    e.preventDefault();

    if (user?.email === car?.email) return toast.error("Action not permitted!");
    const bookingDate = format(new Date().toLocaleDateString(), 'dd-MM-yyyy HH:mm');
    const bookingDetails = {
      carId: car._id,
      userEmail: user.email,
      carModel: car.carModel,
      dailyRentalPrice: car.dailyRentalPrice,
      bookingDate, 
      image: car.images,
      status: 'Pending'
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
    <form
      onSubmit={handleBooking}
      className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
    >
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
    </form>
  );
};

export default CarDetails;
