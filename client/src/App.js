import React, { Component } from "react";
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Routes from './routes/routes';

class App extends Component {
  render() {
    const {lang} = this.props;
    return (
      <IntlProvider locale={lang}>
        <Router>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Routes />
          </AnimatedSwitch>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(App);
