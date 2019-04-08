import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import az from 'react-intl/locale-data/az';
import ru from 'react-intl/locale-data/ru';
import jwt_decode from "jwt-decode";
import { localeSet } from './actions/localeActions';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import App from "./App";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
/* Vendor style files import here */
import "normalize.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "./assets/styles/vendorOverride.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

addLocaleData(az);
addLocaleData(en);
addLocaleData(ru);

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/admin";
  }
}

if(localStorage.geminiLang) {
  store.dispatch(localeSet(localStorage.geminiLang))
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
