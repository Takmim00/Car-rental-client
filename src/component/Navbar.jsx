import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { authContext } from "../provider/AuthProvider";
import './navbar.css'

const Navbar = () => {
  const { user, logout } = useContext(authContext);

  return (
    <div className="navbar  shadow-sm w-11/12 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="" className="h-8" />
        </Link>
      </div>

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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/availableCar">Available Cars</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/addCar">Add Car</NavLink>
              </li>
              <li>
                <NavLink to="/myCar">My Cars</NavLink>
              </li>
              <li>
                <NavLink to="/myBooking">My Bookings</NavLink>
              </li>
            </>
          )}
          {!user && (
            <li>
              <NavLink
                to="/login"
                className="btn bg-red-400 hover:bg-red-600 transition text-white"
              >
                Log-in
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <button
                onClick={logout}
                className="btn btn-block  bg-gray-200 mt-2"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="hidden md:flex md:items-center">
        <ul className="flex gap-4 justify-center items-center py-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/availableCar">Available Cars</NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/addCar">Add Car</NavLink>
              </li>
              <li>
                <NavLink to="/myCar">My Cars</NavLink>
              </li>
              <li>
                <NavLink to="/myBooking">My Bookings</NavLink>
              </li>

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
                      className="btn bg-red-400 hover:bg-red-600 transition text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="btn bg-red-400 hover:bg-red-600 transition text-white px-4"
              >
                Log-in
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
