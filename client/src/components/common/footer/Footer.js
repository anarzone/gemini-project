import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Grid container>
          <Grid item md={4}>
            Footer 1
          </Grid>
          <Grid item md={4}>
            Footer 2
          </Grid>
          <Grid item md={4}>
            Footer 3
          </Grid>
        </Grid>
      </footer>
    )
  }
}

export default Footer;