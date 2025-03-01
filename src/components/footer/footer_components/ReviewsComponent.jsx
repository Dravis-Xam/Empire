import React from "react";
import { useSelector } from "react-redux";

const ReviewsComponent = () => {
  const reviews = useSelector((state) => state.reviews.reviews);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  return (
    <div style={styles.container}>
      <h2>User Reviews</h2>
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
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
    marginTop: "20px",
  },
  review: {
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
};

export default ReviewsComponent;