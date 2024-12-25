import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";


const MyBooking = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    fetchAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const fetchAllBooks = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/books/${user?.email}`
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
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your booking has been canceled successfully.",
                  icon: "success",
                });
                const remaining = cars.filter((car) => car._id !== _id);
                setCars(remaining);
              }
            });
        }
      });
    };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 rounded-md">
              <th className=" px-4 py-2">Car Image</th>
              <th className=" px-4 py-2">Car Model</th>
              <th className=" px-4 py-2">Booking Date</th>
              <th className=" px-4 py-2">Total Price</th>
              <th className=" px-4 py-2">Booking Status</th>
              <th className=" px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((book, i) => (
              <tr key={i} className="">
                <td className=" px-4 py-2 text-center">
                  <img
                    src={book.image}
                    alt={book.carModel}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className=" px-4 py-2 text-center">{book.carModel}</td>
                <td className="px-4 py-2 text-center"> {book.bookingDate}</td>
                <td className=" px-4 py-2 text-center">
                  ${book.dailyRentalPrice}
                </td>
                <td className=" px-4 py-2 text-center">
                <div
          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
            book.status === 'Pending' && ' bg-yellow-100/60 text-yellow-500'
          } ${book.status === 'In Progress' && ' bg-blue-100/60 text-blue-500'} ${
            book.status === 'Completed' && ' bg-green-100/60 text-green-500'
          } ${book.status === 'Rejected' && ' bg-red-100/60 text-red-500'}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              book.status === 'Pending' && 'bg-yellow-500'
            } ${book.status === 'In Progress' && 'bg-blue-500'} ${
              book.status === 'Completed' && 'bg-green-500'
            } ${book.status === 'Rejected' && 'bg-red-500'} `}
          ></span>
          <h2 className='text-sm font-normal '>{book.status}</h2>
        </div>
                </td>
                <td className=" px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    // onClick={() => onModify(booking.id)}
                  >
                    Modify
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() =>handleCancel(book._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
