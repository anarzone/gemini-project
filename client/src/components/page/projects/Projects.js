import React, { Component, Fragment } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Grid from "@material-ui/core/Grid";
import Fade from "react-reveal/Fade";
import Header from "../../common/header/Header";
import Card from "../../common/card/Card";
import ProjectsFilter from "../../projects/ProjectsFilter";

class Projects extends Component {
  render() {
    return (
      <Fragment>
        <Header headerStyle="whiteBg" />
        <ProjectsFilter />
        <Grid container>
          <TransitionGroup>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(value => (
              <Grid key={value} item md={6}>
                <Fade bottom>
                  <Card />
                </Fade>
              </Grid>
            ))}
          </TransitionGroup>
        </Grid>
      </Fragment>
    );
  }
}

export default Projects;
