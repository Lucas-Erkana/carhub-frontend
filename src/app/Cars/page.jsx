"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, deleteCar } from "../../redux/features/carsSlice";

const CarsPage = () => {
  const dispatch = useDispatch();
  const { cars, status } = useSelector((state) => state.cars);

  useEffect(() => {
    // Fetch cars when the component mounts
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDeleteCar = (carId) => {
    dispatch(deleteCar(carId));
  };

  return (
    <div className="bg-gray-100 my-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "failed" ? (
          <p>Error loading data</p>
        ) : (
          cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-md mb-4 p-6"
            >
              <h2 className="text-[28px] font-bold text-gray-900 mb-6">
                {car.name}
              </h2>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-gray-700 font-semibold mb-4">
                  Price: ${car.price}
                </p>
              </div>
              <div className="mt-8 flex">
              <Link href={`/Cars/${car.id}`}>
  <div className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2 cursor-pointer">
    <span>View More</span>
  </div>
</Link>
<button
  onClick={() => handleDeleteCar(car.id)}
  className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-2 cursor-pointer"
>
  <span>Delete</span>
</button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarsPage;

