import React from "react";
import { Link } from "react-router-dom";
import styles from "./headerNav.module.css";

const Nav = ({ showedSearchBar, whiteHeader }) => {
  return (
    <nav
      className={styles.root}
      style={{ visibility: `${showedSearchBar ? "hidden" : "visible"}` }}
    >
      <ul
        className={
          whiteHeader
            ? [styles.menu, styles.menuOnWhite].join(" ")
            : styles.menu
        }
      >
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/">Expertise</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
