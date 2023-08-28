// rentalsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from './url';

// Define the initial state
const initialState = {
  rentals: [],
  status: 'idle',
  error: null,
};

// Define async thunks
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  const response = await axios.get(`${url}/api/v1/rentals`); // Adjust the endpoint if needed
  return response.data;
});

export const createRental = createAsyncThunk('rentals/createRental', async (rentalData) => {
  const response = await axios.post(`${url}/api/v1/rentals`, { rental: rentalData });
  return response.data;
});

export const deleteRental = createAsyncThunk('rentals/deleteRental', async (rentalId) => {
  await axios.delete(`${url}/api/v1/rentals/${rentalId}`);
  return rentalId;
});

// Create the slice
const rentalsSlice = createSlice({
  name: 'rentals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.rentals = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.rentals.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteRental.fulfilled, (state, action) => {
        state.rentals = state.rentals.filter(rental => rental.id !== action.payload);
        state.status = 'succeeded';
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default rentalsSlice.reducer;

