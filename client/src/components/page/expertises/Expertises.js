import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import Card from "../../common/card/Card";

import styles from './expertises.module.css';

class Expertises extends Component {
  state = {
    projects: [
      {
        img: "project-1",
        title: "Haramain High Speed Rail",
        country: "Saudi Arabia"
      },
      {
        img: "project-2",
        title: "Comcast Innovation and Technology Center",
        country: "USA"
      },
      {
        img: "project-3",
        title: "Battersea Power Station",
        country: "UK"
      },
      {
        img: "project-4",
        title: "New Slussen Masterplan",
        country: "Sweden"
      },
      {
        img: "project-5",
        title: "250 City Road",
        country: "UK"
      },
      {
        img: "project-6",
        title: "The One",
        country: "Canada"
      }
    ]
  };

  render() {
    return (
      <LandingLayout headerPosition={false}>
        <div className={styles.banner}>
          <img src="/assets/images/project-1.jpg" alt="Ex"/>
        </div>
        <div className={styles.detailBox}>
          <h2 className={styles.title}>Architecture</h2>
          <p className={styles.text}>We believe the best architecture comes from a synthesis of all the elements that separately comprise and inform the character of a building: the structure that holds it up; the services that allow it to function; its ecology; the quality of natural light; the symbolism of the form; the relationship of the building to the skyline or the streetscape; the way you move through or around it; and last but not least its ability to lift the spirits. By working together creatively from the start of a project, architects and engineers combine their knowledge to devise integrated, sustainable design solutions.
          </p>
        </div>
        <Grid container>
          {this.state.projects.map((project, index) => (
            <Grid item md={6} key={index}>
              <Zoom>
                <Card project={project} />
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </LandingLayout>
    );
  }
}

export default Expertises;
