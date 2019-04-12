import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import Header from "../../common/header/Header";
import Card from "../../common/card/Card";
import CategoryFilter from "../../projects/CategoryFilter";

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
      <LandingLayout headerType="whiteBg">
        <CategoryFilter />
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

export default Projects;
