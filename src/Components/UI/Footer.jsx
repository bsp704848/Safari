import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#f2f4f6] text-black pt-28 pb-10 px-4">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[300%] h-[83px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" fill="#ffffff"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-4 bg-yellow-300 rounded-full text-black px-4 py-2">
            Safari
          </h1>
          <p className="text-black-200 mb-4 text-sm leading-relaxed">
            Book your bike or taxi rides with Safari. Fast, safe, and reliable transportation across India.
          </p>
          <p className="text-black-200 text-sm flex items-center gap-2">
            <FaPhone /> +91 98765 43210
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Company</h2>
          <ul className="space-y-2 text-black-300 text-sm">
            <li><a href="#">About Safari</a></li>
            <li><a href="#">Contact & Support</a></li>
            <li><a href="#">Success History</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-black-300 text-sm">
            <li><a href="#">Premium Support</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Know Our Team</a></li>
            <li><a href="#">Download App</a></li>
          </ul>
        </div>

        <div className="md:col-span-1 md:justify-self-end">
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black-400 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black-400 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black-400 text-xl"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black-400 text-xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-600 pt-4">
        <p className="text-center text-black-300 text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Safari App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
