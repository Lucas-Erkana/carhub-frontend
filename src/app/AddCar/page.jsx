"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCar } from '@/src/redux/features/carsSlice';
import { useRouter } from 'next/navigation';
const AddCarPage = () => {
  const [carData, setCarData] = useState({
    name: '',
    year: '',
    color: '',
    plate_no: '',
    price: '',
    user_id:'',
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Fetch user_id from localStorage and update carData
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setCarData((prevData) => ({
        ...prevData,
        user_id: user.id, // Convert to string if needed
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCar(carData));
    setCarData({
      name: '',
      year: '',
      color: '',
      plate_no: '',
      price: '',
      user_id: carData.user_id, 
    });
    router.push('/Cars');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Add a Car</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Car Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={carData.name}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={carData.year}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={carData.color}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="plate_no" className="block text-gray-700 font-semibold mb-2">
            Plate Number
          </label>
          <input
            type="text"
            id="plate_no"
            name="plate_no"
            value={carData.plate_no}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
            Rental Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;
