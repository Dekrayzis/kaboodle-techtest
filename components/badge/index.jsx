import React from "react";
import PropTypes from "prop-types";
import styles from "./badge.module.scss";

const Badge = ({ label }) => {
  return <div className={styles.badge}>{label}</div>;
};

export default Badge;

Badge.propTypes = {
  data: PropTypes.string,
};
