import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitReview, fetchReviews } from './reviewsSlice';

const ReviewsComponent = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const loading = useSelector((state) => state.reviews.loading);
  const error = useSelector((state) => state.reviews.error);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const userId = useSelector((state) => state.user.userInfo?._id); // Get userId from userInfo

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch reviews when the component mounts
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // Handle review submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignedIn) {
      const review = { rating, comment, userId }; // Include userId
      dispatch(submitReview(review));
      setRating(0);
      setComment('');
    } else {
      alert('Please sign in to submit a review.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Reviews</h2>
      {loading && <p>Loading reviews...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {isSignedIn ? (
        reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} style={styles.review}>
              <p>
                <strong>Rating:</strong> {review.rating}/5
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
            </div>
          ))
        )
      ) : (
        <p>Please sign in to view reviews.</p>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
    marginTop: '20px',
  },
  review: {
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  form: {
    marginTop: '20px',
  },
};

export default ReviewsComponent;