import React, { Fragment } from 'react';
import Header from '../header/Header';
import FooterContainer from '../../../containers/Landing/Footer/FooterContainer';

const LandingLayout = ({ children, headerPosition, headerType }) => {
  return (
    <Fragment>
      <Header positionFixed={headerPosition} headerStyle={headerType} />
        {children}
      <FooterContainer />
    </Fragment>
  )
}

export default LandingLayout;