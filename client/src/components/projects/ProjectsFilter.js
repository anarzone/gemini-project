import React from "react";

import styles from "./projectsFilter.module.css";

const ProjectsFilter = () => (
  <section className={styles.root}>
    <div className={styles.bar}>
      <div className={styles.item}>
        <button className={styles.button} type="button">
          <span className={styles.buttonText}>All project types</span>
          <span className="arrow-down" />
        </button>
      </div>
      <div className={styles.item}>
        <button className={styles.button} type="button">
          <span className={styles.buttonText}>All locations</span>
          <span className="arrow-down" />
        </button>
      </div>
      <div className={styles.projectsCount}>322 projects</div>
    </div>
  </section>
);

export default ProjectsFilter;
