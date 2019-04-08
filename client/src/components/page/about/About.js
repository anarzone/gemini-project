import React, { Component, Fragment } from "react";
import { Zoom } from "react-reveal";
import Header from "../../common/header/Header";

import styles from './about.module.css';

class About extends Component {


  render() {
    return (
      <Fragment>
        <Header positionFixed={false} />
        <div className={styles.banner}>
          <img src="/assets/images/project-4.jpg" alt="About"/>
        </div>
        <div className={styles.detailBox}>
          <p className={styles.text}>We believe the best architecture comes from a synthesis of all the elements that separately comprise and inform the character of a building: the structure that holds it up; the services that allow it to function; its ecology; the quality of natural light; the symbolism of the form; the relationship of the building to the skyline or the streetscape; the way you move through or around it; and last but not least its ability to lift the spirits. By working together creatively from the start of a project, architects and engineers combine their knowledge to devise integrated, sustainable design solutions.
          </p>
        </div>
        
      </Fragment>
    );
  }
}

export default About;
