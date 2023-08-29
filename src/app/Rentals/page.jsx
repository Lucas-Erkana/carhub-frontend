"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/src/redux/features/usersSlice";
import { fetchCars } from "@/src/redux/features/carsSlice";
import { fetchRentals, deleteRental } from "@/src//redux/features/rentalsSlice";

const RentalsPage = () => {
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals.rentals);
  const users = useSelector((state) => state.users.users);
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    dispatch(fetchRentals());
    dispatch(fetchCars());
    dispatch(fetchUsers());
    if (typeof localStorage !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserRole(storedUser ? storedUser.role : null);
    }
  }, [dispatch]);
  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };
  console.log("Users:", users);

  const getCarsNameById = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.name : "Unknown Car";
  };

  const handleDelete = (rentalId) => {
    dispatch(deleteRental(rentalId));
  };

  return (
    <div className="bg-gray-100 my-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] font-bold text-gray-900 my-6">Rentals</h2>
        <ul>
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white rounded-lg shadow-md mb-4 p-6"
            >
              <li key={rental.id}>
                <p className="text-gray-700 font-semibold mb-4">
                  Start Date: {rental.start_date}
                </p>
                <p className="text-gray-700 font-semibold mb-4">
                  End Date: {rental.end_date}
                </p>
                <p className="text-gray-700 font-semibold mb-4">
                  User: {getUserNameById(rental.user_id)}
                </p>
                <p className="text-gray-700 font-semibold mb-4">
                  Car: {getCarsNameById(rental.car_id)}
                </p>
                {userRole === "admin" && (
                  <button
                    className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-2 cursor-pointer"
                    onClick={() => handleDelete(rental.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RentalsPage;
