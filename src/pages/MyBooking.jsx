import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { authContext } from "../provider/AuthProvider";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MyBooking = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAllBooks = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/books/${user?.email}`, 
      { withCredentials: true }
    );
    setCars(data);
  };

  const handleCancel = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/books/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Canceled!",
                text: "Your booking has been canceled successfully.",
                icon: "success",
              });
              const updatedCars = cars.map((car) =>
                car._id === _id ? { ...car, status: "Canceled" } : car
              );
              setCars(updatedCars);
            }
          });
      }
    });
  };

  const openModifyModal = (booking) => {
    if (!booking) return;
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedBooking || !startDate || !endDate) return;

    const updatedData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "Confirmed",
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/dates/${selectedBooking._id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Updated!",
          text: "Booking dates updated successfully, and status confirmed.",
          icon: "success",
        });

        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === selectedBooking._id
              ? { ...car, ...updatedData }
              : car
          )
        );

        setIsModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update booking dates.",
        icon: "error",
      });
      console.error(error);
    }
  };

  // chart data
  const chartData = {
    labels: cars.map((car) => car.carModel),
    datasets: [
      {
        label: "Daily Rental Price",
        data: cars.map((car) => car.dailyRentalPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Car Daily Rental Prices",
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>

      

      {/* Booking */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 rounded-md">
              <th className="px-4 py-2">Car Image</th>
              <th className="px-4 py-2">Car Model</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Booking Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((book, i) => (
              <tr key={i}>
                <td className="px-4 py-2 text-center">
                  <img
                    src={book.image}
                    alt={book.carModel}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="px-4 py-2 text-center">{book.carModel}</td>
                <td className="px-4 py-2 text-center">{`${new Date(
                  book.startDate
                ).toLocaleDateString()} to ${new Date(
                  book.endDate
                ).toLocaleDateString()}`}</td>
                <td className="px-4 py-2 text-center">
                  ${book.dailyRentalPrice}
                </td>
                <td className="px-4 py-2 text-center">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                      book.status === "Pending" &&
                      "bg-yellow-100/60 text-yellow-500"
                    } ${
                      book.status === "In Progress" &&
                      "bg-blue-100/60 text-blue-500"
                    } ${
                      book.status === "Confirmed" &&
                      "bg-green-100/60 text-green-500"
                    } ${
                      book.status === "Canceled" &&
                      "bg-red-100/60 text-red-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        book.status === "Pending" && "bg-yellow-500"
                      } ${book.status === "In Progress" && "bg-blue-500"} ${
                        book.status === "Confirmed" && "bg-green-500"
                      } ${book.status === "Canceled" && "bg-red-500"}`}
                    ></span>
                    <h2 className="text-sm font-normal">{book.status}</h2>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    onClick={() => openModifyModal(book)}
                  >
                    Modify Date
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleCancel(book._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Chart Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Visualization</h2>
        <div className="bg-white p-4 rounded-md shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Modify Booking Date</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Start Date</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">End Date</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
