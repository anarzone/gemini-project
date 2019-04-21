import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import ExpertiseCard from "./ExpertiseCard";

import styles from './expertises.module.css';

const Expertises = ({expertises, loading}) => {
    return ( loading ? 'Loading...' : <LandingLayout headerPosition={false}>
    <div className={styles.banner}>
      {expertises[0].bannerImage ? <img src={`/assets/images/${expertises[0].bannerImage}`} alt="Expertise"/>: 'Loading...'}
    </div>
    <div className={styles.detailBox}>
      <h2 className={styles.title}>Architecture</h2>
      <p className={styles.text}>We believe the best architecture comes from a synthesis of all the elements that separately comprise and inform the character of a building: the structure that holds it up; the services that allow it to function; its ecology; the quality of natural light; the symbolism of the form; the relationship of the building to the skyline or the streetscape; the way you move through or around it; and last but not least its ability to lift the spirits. By working together creatively from the start of a project, architects and engineers combine their knowledge to devise integrated, sustainable design solutions.
      </p>
    </div>
    <Grid container>
      {expertises.map((expertise, index) => (
        <Grid item md={6} key={index}>
          <Zoom>
            <ExpertiseCard expertise={expertise} />
          </Zoom>
        </Grid>
      ))}
    </Grid>
  </LandingLayout>
    );
}

export default Expertises;
