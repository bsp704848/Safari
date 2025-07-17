import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import ProfilePage from "../../Pages/ProfilePage";

export default function Navbar({ onServiceClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate();



  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    {
      name: "Service",
      href: "#",
      onClick: () => {
        if (window.location.pathname === "/") {
          onServiceClick?.();
        } else {
          navigate("/?section=service");
        }
      },
    },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "Book a ride", href: "/book-ride" },
  ];

  return (
    <nav className="bg-white w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div className="flex-shrink-0 text-4xl font-bold text-black rounded-full px-4 py-1 hover:cursor-pointer"
            onClick={() => navigate("/")}
            style={{ textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green` }}
          >
            Safari
          </div>

          <div className="hidden md:flex space-x-8 ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-green-700 font-medium"
                >
                  Welcome, {user.username}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-4 z-50">
                    <ProfilePage />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-green-700 font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-green-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>


      {mobileMenuOpen && (
        <>

          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>


          <div
            className={`
        fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      item.onClick();
                    }
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  {item.name}
                </a>
              ))}

              {user ? (
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex justify-between items-center w-full text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 font-medium"
                  >
                    <span>Welcome, {user.username}</span>
                    <ChevronDown
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="mt-2 bg-gray-50 rounded-md p-4 w-full"
                    >
                      <ProfilePage />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2 border-t border-gray-200 pt-2">
                  <Link
                    to="/login"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </nav>
  );
}
