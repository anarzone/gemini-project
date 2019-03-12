import React from "react";

import styles from "./headerSearch.module.css";

const HeaderSearch = ({ show, onShow, onHide }) => {
  const hideSearchBar = event => {
    event.preventDefault();
    onHide();
  };

  return (
    <div className={styles.root}>
      <button
        className={["icon-search", styles.btn].join(" ")}
        onClick={() => onShow()}
        style={{
          opacity: `${show ? "0" : "1"}`
        }}
      />
      <div
        className={styles.wrapper}
        style={{
          width: `${show ? "100%" : "0"}`,
          opacity: `${show ? "1" : "0"}`,
          zIndex: `${show ? "1000" : "0"}`
        }}
      >
        <form className={styles.form}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search Gemini"
          />
          <button
            className={styles.closeBtn}
            onClick={e => {
              hideSearchBar(e);
            }}
          >
            X
          </button>
        </form>
      </div>
      <div
        className={styles.gradient}
        style={{
          display: `${show ? "block" : "none"}`,
          opacity: `${show ? "1" : "0"}`
        }}
      />
    </div>
  );
};

export default HeaderSearch;
