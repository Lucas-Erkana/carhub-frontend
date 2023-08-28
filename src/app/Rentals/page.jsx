"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/src/redux/features/usersSlice";
import { fetchCars } from "@/src/redux/features/carsSlice";
import { fetchRentals, deleteRental } from "@/src//redux/features/rentalsSlice";

const RentalsPage = () => {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals.rentals);
  const users = useSelector((state) => state.users.users);
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    dispatch(fetchRentals());
    dispatch(fetchCars());
    dispatch(fetchUsers());
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

  const isUserAdmin = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user && user.role === "admin";
  };

  const handleDelete = (rentalId) => {
    dispatch(deleteRental(rentalId));
  };

  return (
    <div className="bg-gray-100 my-24">
      <h2>Rentals</h2>
      <ul>
        {rentals.map((rental) => (
          <li key={rental.id}>
            <p>Start Date: {rental.start_date}</p>
            <p>End Date: {rental.end_date}</p>
            <p>User: {getUserNameById(rental.user_id)}</p>
            <p>Car: {getCarsNameById(rental.car_id)}</p>
            {isUserAdmin(rental.user_id) && (
              <button onClick={() => handleDelete(rental.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalsPage;
