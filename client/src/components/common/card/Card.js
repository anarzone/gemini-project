import React from "react";
import { Link } from "react-router-dom";

import styles from "./card.module.css";

const Card = () => (
  <Link to="/" className={styles.root}>
    <img
      src="/assets/images/slider-1.jpg"
      alt="Project"
      className={styles.image}
    />
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <span className={styles.headerSubtitle}>India</span>
        <span className={styles.headerTitle}>Amaravati masterplan</span>
      </div>
    </div>
  </Link>
);

export default Card;
