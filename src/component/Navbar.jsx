"use client";

import { Calendar, Car, Home, LogOut, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { authContext } from "../provider/AuthProvider";
import "./navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(authContext);
  console.log(user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Bottom navigation links for mobile
  const bottomNavLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/availableCar", label: "Cars", icon: Car },
    {
      to: "/myBooking",
      label: "Bookings",
      icon: Calendar,
      badge: user ? 2 : 0,
    },
    { to: "/addCar", label: "Add Car", icon: Plus },
  ];

  // Desktop navigation links
  const desktopNavLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/availableCar", label: "Available Cars", icon: Car },
    ...(user
      ? [
          { to: "/addCar", label: "Add Car", icon: Plus },
          { to: "/myCar", label: "My Cars", icon: Car },
          { to: "/myBooking", label: "My Bookings", icon: Calendar },
        ]
      : []),
  ];

  return (
    <>
      {/* Top Header - Desktop & Mobile */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center ">
              <Link to="/" className="flex gap-2 items-center">
                <img src={logo} alt="" className="h-8" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {desktopNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveLink(link.to)
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-3 text-sm rounded-full p-1 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <img
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                      src={user.photoURL || "/default-avatar.png"}
                      alt={user.displayName || "Profile"}
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.displayName}
                    </span>
                  </button>

                  {/* Desktop Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="flex items-center justify-start gap-2 px-4 py-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user.displayName}</p>
                          <p className="w-[200px] truncate text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Profile/Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {user ? (
                <button
                  onClick={toggleMobileMenu}
                  className="relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Profile Menu */}
        {isMobileMenuOpen && user && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-6 space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName}
                  className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {user.displayName}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/addCar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Add Car</span>
                </Link>
                <Link
                  to="/myCar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Car className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">My Cars</span>
                </Link>
              </div>

              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white border-t border-gray-200 px-2 py-1 safe-area-pb">
          <div className="flex items-center justify-around">
            {bottomNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveLink(link.to);

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 relative min-w-[60px] ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-gray-900 active:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`h-6 w-6 ${
                        isActive ? "text-red-600" : "text-gray-600"
                      }`}
                    />
                    
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium ${
                      isActive ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile Only */}
      {user && (
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <Link
            to="/addCar"
            className="flex items-center justify-center h-14 w-14 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <Plus className="h-6 w-6" />
          </Link>
        </div>
      )}

      {/* Bottom padding for mobile content */}
      <div className="md:hidden h-16" />

      {/* Overlay for profile dropdown */}
      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
