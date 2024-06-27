import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';
import defaultImage from './Images/default.jpeg';
import { fetchData, deleteMovie, toggleWatchedStatus } from '../../Redux/movieDetailsReducer';
import { useNavigate } from 'react-router-dom';
import {
  setMovieTitle,
  setDescription,
  setReleaseYear,
  setGenre,
  setRating,
  setReviews,
  set_id
} from '../../Redux/movieFormSlice';

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);
  const navigate = useNavigate();

  const editMovieDetails = (data) => {
    console.log('Update button clicked');
    console.log('review is: ', data.Review);
    dispatch(setMovieTitle(data.Movie_Title));
    dispatch(setDescription(data.Description));
    dispatch(setReleaseYear(data.Release_Year));
    dispatch(setGenre(data.Genre.join(',')));
    dispatch(setRating(Number(data.Rating)));
    dispatch(setReviews(data.Review.join(' ')));
    dispatch(set_id(data._id));
    navigate('/updateMovie');
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  const handleDelete = (id, event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event bubbling
    dispatch(deleteMovie(id));
  };

  const handleToggleWatched = (id, event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event bubbling
    dispatch(toggleWatchedStatus(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.cardContainer}>
      {data.length !== 0 ? (
        data.map((d) => (
          <div key={d._id} className={`${styles.cardHolderBorder}`}>
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={defaultImage} alt={d.title} className={styles.imageSize} />
              </div>
              <div className={styles.detailsDisplay}>
                <h2>{d.Movie_Title}</h2>
                <p>{d.Description}</p>
                <p>Release Year: {d.Release_Year}</p>
                <p>Genre: {d.Genre}</p>
                <p>Ratings: {d.Rating ? d.Rating : 'N/A'} ⭐</p>
                <p>Reviews: {d.Review ? d.Review : 'N/A'} </p>
                <p>
                  Watched:
                  <button
                    className={styles.toggleButton}
                    onClick={(event) => handleToggleWatched(d._id, event)}
                  >
                    {d.Watched ? 'Yes' : 'No'}
                  </button>
                </p>
              </div>
              <button
                className={styles.updateButton}
                onClick={() => editMovieDetails(d)}
              >
                Update
              </button>
              <button
                className={styles.deleteButton}
                onClick={(event) => handleDelete(d._id, event)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <span>data is empty!</span>
      )}
    </div>
  );
}
