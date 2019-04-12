import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { SocialIcon } from 'react-social-icons';
import GoogleMapReact from 'google-map-react';
import LandingLayout from '../../common/layout/LandingLayout';

import styles from './contact.module.css';


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

class Contact extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 15
  };

  render() {
    return(
      <LandingLayout headerType="whiteBg">
        <div className={styles.root}>
          <Grid container className={styles.customContainer}>
            <Grid item md={4}>
              <div className={styles.address}>
                <h2>Əlaqə</h2>
                <p>Hamdan Street, Office 302, Level 3, Al Saman Tower B, P.O Box 45715, Abu Dhabi, United Arab Emirates</p>
                <p>+99455 555 55 55</p>
                <SocialIcon url="https://facebook.com" style={{ height: 25, width: 25, marginRight: 10 }} />
                <SocialIcon url="https://twitter.com/jaketrent" style={{ height: 25, width: 25, marginRight: 10 }} />
                <SocialIcon url="https://instagram.com/jaketrent" style={{ height: 25, width: 25 }} />
              </div>
            </Grid>
            <Grid item md={8}>
              <div style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                  // bootstrapURLKeys={{ key: 'AIzaSyCVVUNUj7RA6uhUBLbVzkvvp6I0uL3y_-c' }}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                >
                  <AnyReactComponent
                    lat={40.3983044}
                    lng={49.8747214}
                    text="Gemini"
                  />
                </GoogleMapReact>
              </div>
            </Grid>
          </Grid>
        </div>
      </LandingLayout>
    )
  }
};

export default Contact;