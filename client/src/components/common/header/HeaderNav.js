import React from "react";

import styles from "./headerNav.module.css";

const Nav = ({ showedSearchBar }) => {
  return (
    <nav
      className={styles.root}
      style={{ visibility: `${showedSearchBar ? "hidden" : "visible"}` }}
    >
      <ul className={styles.menu}>
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Projects</a>
        </li>
        <li>
          <a href="">Expertise</a>
        </li>
        <li>
          <a href="">News</a>
        </li>
        <li>
          <a href="">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
