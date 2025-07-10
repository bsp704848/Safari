import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-16 h-16">
 
        <div className="absolute inset-0 rounded-full border-8 border-t-yellow-500 border-b-yellow-500 border-r-yellow-300 border-l-yellow-300 animate-spin"></div>
        
        <div className="absolute inset-0 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12l5 5L20 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
