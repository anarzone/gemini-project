import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import CategoryFilter from "../../projects/CategoryFilter";

const Projects = ({ projects }) =>  {
  console.log('PROJECTS', projects)
  return (
    <LandingLayout headerType="whiteBg">
      <CategoryFilter />
      <Grid container>
        {projects.length > 0 && projects.map((project, index) => (
          <Grid item md={6} key={index}>
            <Zoom>
              <Link to={`/projects/${project._id}`} className="myCard">
                <div className="bgOverlay"></div>
                <img
                  src={`/assets/images/${project.projectImages[0]}`}
                  alt="Project"
                  className="image"
                />
                <div className="header">
                  <div className="headerWrapper">
                    <span className="headerSubtitle">{project.name.az}</span>
                    <span className="headerTitle">{project.name.en}</span>
                  </div>
                </div>
              </Link>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </LandingLayout>
  );
}

export default Projects;
