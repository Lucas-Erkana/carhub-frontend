"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";


import { fetchCarById } from "../../../redux/features/carsSlice"; 

const CarsDetailsPage = () => {
  const { id } = useParams(); // Extract carId from route params
  console.log("carId:", id);
  const dispatch = useDispatch();
  const car = useSelector((state) => state.cars.car);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) {
    return <div>Loading...</div>; // You can show a loading state while fetching
  }

  return (
    <div className="bg-gray-100 my-12">
      <div className="bg-white rounded-lg shadow-md mb-4 p-6">
        <h2 className="text-[28px] font-bold text-gray-900 mb-6">{car.name}</h2>
        <div className="border-t border-gray-300 pt-4">
          <p className="text-gray-700 font-semibold mb-4">
            Price: ${car.price}
          </p>
          <p className="text-gray-700 font-semibold mb-4">
            Year: ${car.year}
          </p>
          <p className="text-gray-700 font-semibold mb-4">
            Color: ${car.color}
          </p>
          <p className="text-gray-700 font-semibold mb-4">
            Plate no: ${car.plate_no}
          </p>
          <p className="text-gray-700 font-semibold mb-4">
            Rent Price: ${car.price}
          </p>
        </div>
        <div className="mt-8">
          <Link
            href={`/Cars/${car.id}/RentCar`} // Replace ":id" with the actual car ID
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Rent Car
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsDetailsPage;
