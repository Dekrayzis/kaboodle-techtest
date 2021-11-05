import React, { useState } from "react";
import styles from "./starRating.module.scss";

const StarRating = ({ rating }) => {
  const [state, setState] = useState(rating);
  let markup = [];

  const updateRating = (newValue) => {
    state.rating === newValue ? setState(0) : setState(newValue);
  };

  for (let i = 0; i < 5; i++) {
    markup.push(
      <RatingStar
        key={i}
        rating={i + 1}
        isSet={i < rating}
        updateRating={updateRating}
      />
    );
  }

  return <div className={styles.starRating__Wrapper}>{markup}</div>;
};

export default StarRating;

StarRating.defaultProps = {
  rating: 0,
  totalStars: 5,
};

const RatingStar = ({ rating, isSet, updateRating }) => {
  return (
    <svg
      className={isSet ? `${styles.star} ${styles.set}` : `${styles.star}`}
      width="25"
      height="25"
      onClick={() => updateRating(rating)}
    >
      <path d="m55,237 74-228 74,228L9,96h240" transform="scale(0.10)" />
    </svg>
  );
};
