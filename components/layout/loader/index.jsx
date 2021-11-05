import React, { useEffect } from "react";
import styles from "./loader.module.scss";

const Loader = () => {
  useEffect(() => {
    window.onload = () => {
      let circles = document.getElementsByClassName("part");
      for (let i = 0; i < circles.length; i++) {
        circles[i].style.setProperty("--size", circleSize + "px");
        circles[i].style.animationDelay = i / (circles.length - 2) + "s";
        circles[i].style.setProperty(
          "--z-pos",
          (((i - circles.length / 2) * 1) / circles.length) * circleSize + "px"
        );

        let pos = (i + 0.6) / (circles.length - 0.3 + 0.2);
        let size = Math.sqrt(1 / 4 - (pos - 1 / 2) * (pos - 1 / 2)) * 2;

        circles[i].style.setProperty("--part-scaling", size);
      }
    };
  },[]);

  return (
    <div id="spinner">
      {Array(18).map((_, idx) => (
        <div key={idx} className={styles.part} />
      ))}
    </div>
  );
};

export default Loader;
