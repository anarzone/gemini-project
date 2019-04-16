import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  headerClass = () => {
    const { headerStyle } = this.props;
    let headerClass = null;
    if (headerStyle === "whiteBg") {
      headerClass = [styles.root, styles.whiteBg].join(" ");
    } else {
      headerClass = styles.root;
    }

    return headerClass;
  };

  render() {
    return (
      <header className={this.headerClass()} style={{position: `${this.props.positionFixed ? 'fixed' : 'absolute'}` }}>
        <Link
          to="/"
          className={styles.logo}
          style={{ zIndex: `${this.state.showSearchBar ? "1000" : "initial"}`}}
        >
          <img src="/assets/images/gemini-logo.png" alt="Logo" />
        </Link>
        <HeaderSearch
          show={this.state.showSearchBar}
          onShow={this.showSearchBar}
          onHide={this.hideSearchBar}
          whiteHeader={this.props.headerStyle ? true : false}
        />
        <Nav
          showedSearchBar={this.state.showSearchBar}
          whiteHeader={this.props.headerStyle ? true : false}
        />
      </header>
    );
  }
}

export default Header;
