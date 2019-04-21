import React, { Component, Fragment } from "react";
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import CategoryFilter from "../../projects/CategoryFilter";

import styles from './expertises.module.css';

const ExpertiseDetail = ({ expertise }) => {
    return (
      <LandingLayout headerType="whiteBg">
        <CategoryFilter />
        <div className={styles.bannerImageDetail}>
          <img src={`/assets/images/${expertise.bannerImage}`} alt="Expertise"/>
        </div>
        <div className={styles.detailBox}>
          {expertise.name ? <p className={styles.text}>{expertise.content.az}</p> : 'Loading...'}
        </div>
      </LandingLayout>
    );
}

export default ExpertiseDetail;
