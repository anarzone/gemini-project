import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../common/header/Header";
import Card from "../../common/card/Card";
import ProjectHeader from "../../projects/ProjectHeader";

class Projects extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ProjectHeader />
        <Grid container>
          {[0, 1, 2, 3].map(value => (
            <Grid key={value} item md={6}>
              <Card />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

export default Projects;
