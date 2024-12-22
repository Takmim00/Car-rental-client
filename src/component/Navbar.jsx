import { useContext} from "react";
import { Link } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(authContext);




  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" alt="" />
          <span className="font-bold">Car</span>
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal items-center px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/available-cars">Available Cars</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/add-car">Add Car</Link>
              </li>
              <li>
                <Link to="/my-cars">My Cars</Link>
              </li>
              <li>
                <Link to="/my-bookings">My Bookings</Link>
              </li>


              <div className="dropdown dropdown-end z-50">
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
                  <li className="mt-2">
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
