import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import url from './url';

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${url}api/v1/users`);  // Adjust the endpoint if needed
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    const response = await axios.get(
      `${url}api/v1/users/${userId}`
    );
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  'users/postUser',
  async (userData) => {
    const response = await fetch(`${url}api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await axios.delete(`${url}api/v1/users/${userId}`);
    return userId;
  }
);

// Create the slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.users = null;
      localStorage.removeItem('user');
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default usersSlice.reducer;
export const { setUser, clearUser } = usersSlice.actions;