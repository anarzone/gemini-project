import React from "react";
import Grid from "@material-ui/core/Grid";
import { Zoom } from "react-reveal";
import LandingLayout from '../../common/layout/LandingLayout';
import ProjectCard from "./ProjectCard";
import CategoryFilter from "../../projects/CategoryFilter";

const ProjectTypes = ({ categories }) =>  {
  console.log('PROJECTS', categories)
  return (
    <LandingLayout headerType="whiteBg">
      <CategoryFilter />
      <Grid container>
        {categories.length > 0 && categories.map((category, index) => (
          <Grid item md={6} key={index}>
            <Zoom>
              <ProjectCard category={category} />
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </LandingLayout>
  );
}

export default ProjectTypes;
