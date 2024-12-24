import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../provider/AuthProvider";

const MyCar = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/myCars?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, [user.email]);
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
        fetch(`${import.meta.env.VITE_API_URL}/cars/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
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
    <div className="bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Your Cars</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full  border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Car Image</th>
                <th className="px-4 py-2 border border-gray-300">Car Model</th>
                <th className="px-4 py-2 border border-gray-300">
                  Daily Rental Price
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Availability
                </th>
                <th className="px-4 py-2 border border-gray-300">Date Added</th>
                <th className="px-4 py-2 border border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="px-4 py-2 text-center">
                    <img
                      src={car.images[0]}
                      alt="Car"
                      className="w-40 h-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{car.carModel}</td>
                  <td className="px-4 py-2 text-center">
                    ${car.dailyRentalPrice}/Day
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={
                        car.availability === "Available"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {car.availability}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(car.dateAdded).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdate(car._id)}
                      className="bg-blue-500 text-white px-3 py-2 rounded mr-4"
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
        </div>
      </div>
    </div>
  );
};

export default MyCar;
