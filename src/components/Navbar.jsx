"use client";
import React, { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ImExit } from "react-icons/im";
import { useRouter } from "next/navigation";

import { clearUser } from "../redux/features/usersSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserRole(storedUser ? storedUser.role : null);
    }
  }, []);

  console.log(userRole);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    router.push("/Splash");
  };

  return (
    <nav
      className={`fixed top-0 w-full bg-[#4d79ff] z-50 ${
        menuOpen ? "h-screen" : "h-auto"
      }`}
    >
      <div className="max-w-6xl h-16 mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-semibold ml-4">
          Logo
        </Link>
        <div
          className={`hidden md:flex space-x-4 ${
            menuOpen ? "hidden" : ""
          } transition-opacity duration-300 ease-in-out`}
        >
          <Link href="/" className="text-white text-lg hover:underline">
            Home
          </Link>
          <Link href="/#about" className="text-white text-lg hover:underline">
            About
          </Link>
          <Link href="/Cars" className="text-white text-lg hover:underline">
            Cars
          </Link>
          {userRole === "admin" && (
            <>
              <Link
                href="/AddCar"
                className="block text-white text-lg hover:underline"
              >
                Add Car
              </Link>
            </>
          )}
          <Link href="/#contact" className="text-white text-lg hover:underline">
            Contact
          </Link>

          <button
            onClick={handleLogout}
            className="flex flex-row justify-around text-white text-lg hover:underline"
          >
            Sign out <ImExit className="m-1" />
          </button>
        </div>
        <div className="md:hidden mr-4">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              className={`w-6 h-6 ${
                menuOpen ? "hidden" : ""
              } transition-opacity duration-300 ease-in-out`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`w-6 h-6 ${
                menuOpen ? "" : "hidden"
              } transition-opacity duration-300 ease-in-out`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col justify-center my-16 items-center md:hidden bg-[#4d79ff] space-y-4 transition-opacity duration-1000 ease-in-out">
          <Link
            href="/"
            className="block text-white p-2 text-3xl hover:bg-[#3c64e1]"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="block text-white p-2 text-3xl  hover:bg-[#3c64e1]"
          >
            About
          </Link>
          <Link
            href="/Cars"
            className="block text-white p-2 text-3xl hover:bg-[#3c64e1]"
          >
            Cars
          </Link>
          {userRole === "admin" && (
            <>
              <Link
                href="/AddCar"
                className="block text-white text-3xl hover:underline"
              >
                Add Car
              </Link>
            </>
          )}
          <Link
            href="/#contact"
            className="block text-white p-2 text-3xl  hover:bg-[#3c64e1]"
          >
            Contact
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-row justify-around text-white text-3xl hover:underline ml-1"
          >
            Sign out <ImExit className="m-1 mx-2" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
