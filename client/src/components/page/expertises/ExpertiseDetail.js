import React, { Component, Fragment } from "react";
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import Card from "../../common/card/Card";
import CategoryFilter from "../../projects/CategoryFilter";

import styles from './expertises.module.css';

class ExpertiseDetail extends Component {
  render() {
    return (
      <LandingLayout headerType="whiteBg">
        <CategoryFilter />
        <div className={styles.bannerImageDetail}>
          <img src="/assets/images/project-5.jpg" alt="Expertise"/>
        </div>
        <div className={styles.detailBox}>
          <p className={styles.text}>The Environmental Engineering team designs efficient building systems that reduce energy and water consumption, enhances user comfort and ensures indoor environmental quality. There are many aspects to the team’s work including: Mechanical Engineering; Electrical Engineering; Public Health; Fire Protection; Vertical Transportation; Architectural Lighting Design; Building Physics and Sustainability.
          </p>
        </div>
      </LandingLayout>
    );
  }
}

export default ExpertiseDetail;
