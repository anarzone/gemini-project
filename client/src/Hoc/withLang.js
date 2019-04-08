import React from 'react';
import { connect } from 'react-redux';

export function withLang(WrappedComponent) {
  class WithLang extends React.Component {
    state = {
      lang: 'az'
    }

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent  {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      lang: state.locale.lang
    }
  }

  return connect(mapStateToProps)(WithLang);
}

