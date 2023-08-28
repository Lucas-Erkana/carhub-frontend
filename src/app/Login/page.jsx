"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchUsers } from "../../redux/features/usersSlice";


const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await dispatch(fetchUsers()).unwrap();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLogin = () => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      router.push("/");
      localStorage.setItem("user", JSON.stringify(foundUser));
    } else {
      setErrorMessage("Invalid email or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000); // Hide the error message after 3 seconds
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center mx-6 md:mx-auto md:max-w-md mt-20">
      <h1 className="text-4xl h-12 font-bold tracking-widest mt-8 md:mt-18">
        LOGIN
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        <span className="text-blue-500 font-semibold">Discover</span> the
        endless possibilities that await you.
      </p>
      <form
        className="bg-white h-full p-6 rounded-lg shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="email"
          className="w-full my-4 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full my-4 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <div className="flex flex-col sm:items-center md:block">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
