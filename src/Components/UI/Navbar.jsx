import React, { useState } from "react";
import { Menu, X,ChevronDown } from "lucide-react"; 
import { useAuthStore } from "../../store/useAuthStore";
import { Link,useNavigate } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();   
    setDropdownOpen(false);
    navigate("/login");
  };

  const navItems = [
    { name: "About Us", href: "/about" },
    { name: "Safety", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Book a ride", href: "/book-ride" },
  ];

  return (
    <nav className="bg-white w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
      
          <div className="flex-shrink-0 text-2xl font-bold text-black bg-yellow-300 rounded-full px-4 py-1 hover:cursor-pointer"
            onClick={() => navigate("/")}>
            Safari
          </div>

     
          <div className="hidden md:flex space-x-8 ">
            {navItems.map((item) => (
              <a
              key={item.name}
              href={item.href}
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
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
  <div className="md:hidden bg-white shadow-lg">
    <div className="px-4 py-3 space-y-2">
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
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
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

         
          {dropdownOpen && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
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
)}

    </nav>
  );
}
