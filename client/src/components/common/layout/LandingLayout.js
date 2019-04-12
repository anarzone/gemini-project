import React, { Fragment } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const LandingLayout = ({ children, headerPosition, headerType }) => {
  return (
    <Fragment>
      <Header positionFixed={headerPosition} headerStyle={headerType} />
        {children}
      <Footer />
    </Fragment>
  )
}

export default LandingLayout;