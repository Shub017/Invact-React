import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  _id :'',
  Movie_Title: '',
  Description: '',
  Release_Year: '',
  Genre: '',
  Watched: false,
  Rating: '',
  Review: '',
  status: 'idle',
  error: null,
};

// Async thunk to send form data
export const sendFormData = createAsyncThunk(
  'movieForm/sendFormData',
  async (formData, { rejectWithValue }) => {
    try {
      // Exclude status and error from the form data
      const { _id, status, error, ...dataToSend } = formData;

      const response = await fetch('http://localhost:4040/movies/addNewMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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

// Async thunk to send form data
export const UpdateFormData = createAsyncThunk(
  'movieForm/sendFormData',
  async (formData, { rejectWithValue }) => {
    try {
      // Exclude status and error from the form data
      const { status, error, ...dataToSend } = formData;

      const response = await fetch('http://localhost:4040/movies/editMovie', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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

const movieFormSlice = createSlice({
  name: 'movieForm',
  initialState,
  reducers: {
    setMovieTitle: (state, action) => {
      state.Movie_Title = action.payload;
    },
    setDescription: (state, action) => {
      state.Description = action.payload;
    },
    setReleaseYear: (state, action) => {
      state.Release_Year = action.payload;
    },
    setGenre: (state, action) => {
      state.Genre = action.payload.split(',');
    },
    setRating: (state, action) => {
      state.Rating = action.payload;
    },
    setReviews: (state, action) => {
      state.Review = action.payload;
    },
    set_id:(state, action)=>{
      state._id = action.payload;
    },
    resetForm: (state) => {
      state.Movie_Title = '';
      state.Description = '';
      state.Release_Year = '';
      state.Genre = '';
      state.Rating = '';
      state.Review = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendFormData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setMovieTitle,
  setDescription,
  setReleaseYear,
  setGenre,
  setRating,
  setReviews,
  set_id,
  resetForm,
} = movieFormSlice.actions;

export default movieFormSlice.reducer;
