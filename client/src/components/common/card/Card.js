import React from "react";
import { Link } from "react-router-dom";

import styles from "./card.module.css";

const Card = ({ project }) => (
  <Link to="/" className={styles.root}>
    <img
      src={`/assets/images/${project.img}.jpg`}
      alt="Project"
      className={styles.image}
    />
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <span className={styles.headerSubtitle}>{project.country}</span>
        <span className={styles.headerTitle}>{project.title}</span>
      </div>
    </div>
  </Link>
);

export default Card;
