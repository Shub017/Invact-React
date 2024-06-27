import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMovieTitle,
  setDescription,
  setReleaseYear,
  setGenre,
  setRating,
  setReviews,
  resetForm,
  sendFormData,
} from '../../Redux/movieFormSlice';
import styles from './addMovie.module.css';

const MovieForm = () => {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.movieForm);
  const { status, error } = useSelector((state) => state.movieForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'Movie_Title':
        dispatch(setMovieTitle(value));
        break;
      case 'Description':
        dispatch(setDescription(value));
        break;
      case 'Release_Year':
        dispatch(setReleaseYear(value));
        break;
      case 'Genre':
        dispatch(setGenre(value));
        break;
      case 'Rating':
        dispatch(setRating(Number(value)));
        break;
      case 'Reviews':
        dispatch(setReviews(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendFormData(formValues));
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Movie Form</h2>
      <input
        type="text"
        name="Movie_Title"
        value={formValues.Movie_Title}
        onChange={handleInputChange}
        placeholder="Movie Title"
      />
      <textarea
        name="Description"
        value={formValues.Description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="Release_Year"
        value={formValues.Release_Year}
        onChange={handleInputChange}
        placeholder="Release Year"
      />
      <input
        type="text"
        name="Genre"
        value={formValues.Genre}
        onChange={handleInputChange}
        placeholder="Genre"
      />
      <select
        name="Rating"
        value={formValues.Ratings}
        onChange={handleInputChange}
      >
        <option value="">Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <textarea
        name="Reviews"
        value={formValues.Reviews}
        onChange={handleInputChange}
        placeholder="Reviews"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className={styles.error}>Error: {error}</p>}
    </form>
  );
};

export default MovieForm;
