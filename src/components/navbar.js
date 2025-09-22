"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function NavBar({ logout }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-[#7B4019] text-white   top-0 right-0 left-0 shadow-lg z-10">
      {/* <nav className="flex items-center justify-between px-12 h-16 lg:gap-8"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex  justify-between items-center w-full">
            <div className="flex-shrink-0">
              <span
                
                className="text-2xl font-bold border-2 px-2 py-1 whitespace-nowrap "
              >
                Post App
              </span>
            </div>
            <div className="md:flex items-center flex-row gap-8 font-bold text-lg hidden ">
              <button
                onClick={logout}
                className="bg-orange-400 rounded-lg px-2 py-1 whitespace-nowrap cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center md:ml-5">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#FFEEA9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#7B4019] focus:ring-[#FFEEA9]"
              aria-expanded="false"
            >
              {/* <span className="sr-only">Open main menu</span> */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* </nav> */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-dvh bg-[#FFEEA9] text-black text-center z-100">
          <a
            href="/merge"
            className=" hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Merge PDF
          </a>
          <a
            href="/split"
            className="  hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Split PDF
          </a>
          <a
            href="/compress"
            className="  hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Compress PDF
          </a>
        </div>
      </div>
    </header>
  );
}
