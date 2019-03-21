import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Zoom } from "react-reveal";
import Header from "../../common/header/Header";
import Card from "../../common/card/Card";
import ProjectsFilter from "../../projects/ProjectsFilter";

class Projects extends Component {
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
      <Fragment>
        <Header headerStyle="whiteBg" />
        <ProjectsFilter />
        <Grid container>
          {this.state.projects.map((project, index) => (
            <Grid item md={6} key={index}>
              <Zoom>
                <Card project={project} />
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

export default Projects;
