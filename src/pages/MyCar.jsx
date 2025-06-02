import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../provider/AuthProvider";

const MyCar = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchCars = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/myCars?email=${
        user.email
      }&sortBy=${sortBy}&order=${order}`,
      { withCredentials: true }
    );

    setCars(data);
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email, sortBy, order]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_API_URL}/cars/${_id}`,
          {
            method: "DELETE",
          },
          { withCredentials: true }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your car has been deleted successfully.",
                icon: "success",
              });
              const remaining = cars.filter((car) => car._id !== _id);
              setCars(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/updateCar/${id}`);
  };

  return (
    <div className="p-6 w-11/12 mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-red-800">Manage Your Cars</h1>
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
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-red-200 rounded-lg overflow-hidden">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="px-4 py-3 border border-gray-300">Car Image</th>
              <th className="px-4 py-3 border border-gray-300">Car Model</th>
              <th className="px-4 py-3 border border-gray-300">
                Daily Rental Price
              </th>
              <th className="px-4 py-2 border border-gray-300">Availability</th>
              <th className="px-4 py-2 border border-gray-300">Date Added</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className={`hover:bg-red-50 ${
                  index % 2 === 0 ? "bg-red-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-center border-r border-red-200">
                  <img
                    src={car.images[0]}
                    alt="Car"
                    className="w-24 h-16 object-cover mx-auto rounded-md border border-red-300 shadow-sm"
                  />
                </td>
                <td className="px-4 py-2 text-center">{car.carModel}</td>
                <td className="px-4 py-2 text-center">
                  ${car.dailyRentalPrice}/Day
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={
                      car.bookingCount > 0
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    {car.bookingCount > 0 ? "Unavailable" : "Available"}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {new Date(car.dateAdded).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center flex justify-center items-center h-full gap-2">
                  <button
                    onClick={() => handleUpdate(car._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cars.length === 0 && (
          <p className="text-center text-red-700 font-semibold text-xl mt-6 p-8 bg-red-50 rounded-lg">
            It seems you haven't added any cars yet!{" "}
            <a
              href="/addCar"
              className="text-red-600 underline hover:text-red-800"
            >
              Add Your First Car
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCar;
