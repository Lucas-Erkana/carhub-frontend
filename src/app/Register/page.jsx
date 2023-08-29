"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, setUser } from "../../redux/features/usersSlice";
import { fetchCities } from "../../redux/features/citiesSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("user");

  const router = useRouter();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(fetchCities());
    if (user) {
      router.push("/");
    }
  }, [dispatch, user]);

  const handleRegister = async () => {
    if (name && address && email && role && password && selectedCity) {
      try {
        const userData = {
          name,
          address,
          email,
          password,
          role: role,
          city_id: selectedCity,
        };

        dispatch(createUser(userData));

        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUser(userData));
        // console.log(userData)
        console.log("User registered successfully");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      setErrorMessage("Please fill in all fields");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl h-12 font-bold tracking-widest mt-20">
        JOIN OUR PLATFORM
      </h1>
      <form className="bg-white h-full p-6 rounded-lg shadow-md">
        <input
          type="text"
          label="Name"
          variant="bordered"
          placeholder="Enter your name"
          value={name}
          className="w-full my-4 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          label="Address"
          variant="bordered"
          placeholder="Enter your address"
          value={address}
          className="w-full my-4  border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          value={email}
          className="w-full my-4  border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          label="Password"
          variant="bordered"
          placeholder="Create your password"
          value={password}
          className="w-full my-4  border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full my-4  border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          className="w-full my-4  border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p className="bg-red-300 rounded-md text-red-800 text-xs md:text-md p-2">
            {errorMessage}
          </p>
        )}
        <Link href="/">
          <button
            type="button"
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
