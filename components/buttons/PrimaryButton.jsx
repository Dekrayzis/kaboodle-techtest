import React from "react";
import PropTypes from "prop-types";
import styles from "./buttons.module.scss";

const PrimaryButton = ({ label, press }) => {
  return (
    <button className={styles.primaryBtn} onClick={press}>
      {label}
    </button>
  );
};

export default PrimaryButton;

PrimaryButton.propTypes = {
  label: PropTypes.string,
  press: PropTypes.func,
};
