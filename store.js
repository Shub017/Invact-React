// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Redux/movieDetailsReducer';
import movieFormReducer from './Redux/movieFormSlice';

export const store = configureStore({
  reducer: {
    data:dataReducer,
    movieForm: movieFormReducer,
  },
});