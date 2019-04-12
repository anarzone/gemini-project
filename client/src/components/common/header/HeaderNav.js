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
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/expertises">Expertise</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
