import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(authContext);

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Logo and Branding */}
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" alt="" />
          <span className="font-bold text-xl">Car</span>
        </Link>
      </div>
      

      {/* Mobile Dropdown for Small Screens */}
      <div className="dropdown dropdown-left md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] w-52 bg-base-100 rounded-box shadow p-2"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/availableCar">Available Cars</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/addCar">Add Car</Link>
              </li>
              <li>
                <Link to="/myCar">My Cars</Link>
              </li>
              <li>
                <Link to="/myBooking">My Bookings</Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link to="/login">Log-in</Link>
            </li>
          )}
          {user && (
            <li>
              <button
                onClick={logout}
                className="btn btn-block bg-gray-200 mt-2"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
      

      {/* Desktop Navigation for Larger Screens */}
      <div className="hidden md:flex md:items-center">
        <ul className="menu menu-horizontal items-center px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/availableCar">Available Cars</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/addCar">Add Car</Link>
              </li>
              <li>
                <Link to="/myCar">My Cars</Link>
              </li>
              <li>
                <Link to="/myBooking">My Bookings</Link>
              </li>
              {/* User Profile and Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div
                    title={user?.displayName || "Profile"}
                    className="w-10 rounded-full"
                  >
                    <img
                      referrerPolicy="no-referrer"
                      alt="User Profile"
                      src={user?.photoURL || "/default-avatar.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button
                      onClick={logout}
                      className="btn btn-block bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <li>
              <Link to="/login">Log-in</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
