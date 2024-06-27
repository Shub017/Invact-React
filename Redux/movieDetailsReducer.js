// movieDetailsReducer.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch movie data
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('http://localhost:4040/movies/getMovieDetails');
  const data = await response.json();
  console.log('data received: ', data);
  return data.response;
});

// Async thunk to delete a movie
export const deleteMovie = createAsyncThunk(
  'data/deleteMovie',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4040/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to toggle Watched status
export const toggleWatchedStatus = createAsyncThunk(
  'data/toggleWatchedStatus',
  async (_id, { rejectWithValue }) => {
    console.log('_id to be sent for toggling watch status', _id);

    try {
      const response = await fetch(`http://localhost:4040/movies/toggleWatchedStatus?_id=${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the local state to reflect the toggle
      const updatedMovie = await response.json();
      return updatedMovie;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted movie from state
        state.data = state.data.filter(movie => movie._id !== action.payload._id);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleWatchedStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleWatchedStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the local state with the toggled movie
        const updatedMovie = action.payload;
        state.data = state.data.map(movie =>
          movie._id === updatedMovie._id ? { ...movie, Watched: updatedMovie.Watched } : movie
        );
      })
      .addCase(toggleWatchedStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default movieDetailsSlice.reducer;
