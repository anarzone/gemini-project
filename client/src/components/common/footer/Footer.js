import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import Grid from '@material-ui/core/Grid';

import styles from './footer.module.css'

class Footer extends Component {

  state = {
    menuList: [
      {
        name: 'About',
        url: '/about'
      },
      {
        name: 'Projects',
        url: '/projects'
      },
      {
        name: 'Expertise',
        url: '/expertises'
      },
      {
        name: 'Contact',
        url: '/contact'
      }
    ]
  }

  render() {
    console.log('rendered', this.props)
    const { projects, expertises } = this.props;
    return (
      <footer className={styles.footer}>
        <div className={styles.root}>
          <Grid container spacing={24}>
            <Grid item md={4}>
              <h2 className={styles.menuTitle}>Projects</h2>
              <ul className={styles.menu}>
                {projects ? projects.map((project, index) => (
                  <li key={index}>
                    <Link to={`/projects/types/${project._id}`}>{project.name ? project.name.az : ''}</Link>
                  </li>
                )) : 'Loading...'}
              </ul>
            </Grid>
            <Grid item md={4}>
              <h2 className={styles.menuTitle}>Expertise</h2>
              <ul className={styles.menu}>
              
                {expertises ? expertises.map((expertise, index) => (
                  <li key={index}>
                    <Link to={`/expertises/${expertise._id}`}>{expertise.name ? expertise.name.az : ''}</Link>
                  </li>
                )) : 'Loading...'}
              </ul>
            </Grid>
            <Grid item md={4}>
              <h2 className={styles.menuTitle}>About us</h2>
              <ul className={styles.menu}>
                {this.state.menuList.map((menu, index) => (
                  <li key={index}>
                    <Link to={menu.url}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© Copyright 2019 Gemini company. All Rights Reserved.</p>
          <div>
            <SocialIcon url="https://facebook.com" style={{ height: 25, width: 25, marginRight: 10 }} />
            <SocialIcon url="https://twitter.com/jaketrent" style={{ height: 25, width: 25, marginRight: 10 }} />
            <SocialIcon url="https://instagram.com/jaketrent" style={{ height: 25, width: 25 }} />
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;