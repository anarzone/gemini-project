import React, { Component } from "react";
import Nav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import styles from "./header.module.css";

class Header extends Component {
  state = {
    showSearchBar: false
  };

  showSearchBar = () => {
    this.setState({ showSearchBar: true });
  };

  hideSearchBar = () => {
    this.setState({ showSearchBar: false });
  };

  render() {
    return (
      <header className={styles.root}>
        <a
          className={styles.logo}
          style={{ zIndex: `${this.state.showSearchBar ? "1000" : "initial"}` }}
        >
          <img src="/assets/images/main-logo.png" alt="Logo" />
        </a>
        <HeaderSearch
          show={this.state.showSearchBar}
          onShow={this.showSearchBar}
          onHide={this.hideSearchBar}
        />
        <Nav showedSearchBar={this.state.showSearchBar} />
      </header>
    );
  }
}

export default Header;
