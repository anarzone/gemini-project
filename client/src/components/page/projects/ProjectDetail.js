import React, { Component, Fragment } from "react";
import { Grid } from '@material-ui/core';
import { Zoom, Fade } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import Card from "../../common/card/Card";

import styles from './projectDetail.module.css';

class ProjectDetail extends Component {

  renderDetailImage = (count) => {
    const { project } = this.props;
    let images = [];
    for (let key in project.projectImages) {
      images.push(project.projectImages[key]);
    }
    return images[count]
  }
  
  render() {
    const { project } = this.props;
    return (
      <LandingLayout headerPosition={false}>
        <div className={styles.banner}>
          <div className={styles.bgOverlay}></div>
          { project ? 
            <Fade>
              <img src={`/assets/images/${this.renderDetailImage(0)}`} alt="Project"/>
            </Fade> : 
            'Loading...'
          }
          <h1 className={styles.projectTitle}>{project.name ? project.name.az : ''}</h1>
        </div>
        <div className={styles.detailBox}>
          <p className={styles.text}>
            {project.content ? project.content.az : '...'}
          </p>
        </div>
        <div className={styles.heroImg}>
          <Fade>
            <img src={`/assets/images/${this.renderDetailImage(1)}`} alt="ss"/>
          </Fade>
        </div>
        <Grid container>
          {/*this.state.projects.map((project, index) => (
            <Grid item md={6} key={index}>
              <Zoom>
                <Card project={project} />
              </Zoom>
            </Grid>
          ))*/}
        </Grid>
      </LandingLayout>
    );
  }
}

export default ProjectDetail;
