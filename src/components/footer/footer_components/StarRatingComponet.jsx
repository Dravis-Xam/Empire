import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../../../features/review/reviewSlice"; // Import submitReview instead of addReview

const StarRatingComponent = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  // Get authentication state from authSlice
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    if (!isAuthenticated) {
      alert("You must be signed in to leave a comment.");
      return;
    }

    // Dispatch the submitReview action with the review data
    dispatch(submitReview({ rating, comment })) // Use submitReview here
      .unwrap() // Handle the promise returned by the async action
      .then(() => {
        alert("Review submitted successfully!");
        setRating(0);
        setComment("");
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        alert("Failed to submit review. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 className="rating-title">Rate Our Site</h2>
      <div style={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{
              ...styles.star,
              color: value <= rating ? "#ffcc00" : "#ccc",
            }}
            onClick={() => handleStarClick(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <p style={styles.ratingText}>
        Your rating: <span>{rating}</span>/5
      </p>
      {isAuthenticated ? (
        <textarea
          style={styles.textarea}
          placeholder="Leave a comment about your experience..."
          value={comment}
          onChange={handleCommentChange}
        />
      ) : (
        <p style={styles.signInMessage}>Please sign in to leave a comment.</p>
      )}
      <button
        style={styles.button}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "250px",
  },
  stars: {
    fontSize: "2rem",
    cursor: "pointer",
  },
  star: {
    transition: "color 0.2s",
  },
  ratingText: {
    margin: "10px 0",
    fontSize: "1.2rem",
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "none",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  signInMessage: {
    color: "#ff0000",
    marginTop: "10px",
  },
  errorMessage: {
    color: "#ff0000",
    marginTop: "10px",
  },
};

export default StarRatingComponent;