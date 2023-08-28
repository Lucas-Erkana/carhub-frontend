"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation"; 
import { createRental } from "@/src//redux/features/rentalsSlice"; 

const RentCarPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams(); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRentCar = () => {

    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user).id;

    const rentalData = {
      start_date: startDate,
      end_date: endDate,
      car_id: id,
      user_id,
    };

    dispatch(createRental(rentalData));
    router.push("/Rentals");
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center mx-6 md:mx-auto md:max-w-md mt-20">
      <h1 className="text-4xl h-12 font-bold tracking-widest mt-8 md:mt-18">
        Rent this car
      </h1>
      <form
        onSubmit={handleRentCar}
        className="bg-white h-full p-6 rounded-lg shadow-md"
      >
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            value={startDate}
            className="w-full my-4 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            value={endDate}
            className="w-full my-4 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
        >
          Rent
        </button>
      </form>
    </div>
  );
};

export default RentCarPage;
