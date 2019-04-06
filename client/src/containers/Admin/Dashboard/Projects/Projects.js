import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import ProjectCategories from "../../../../components/page/dashboard/Projects/ProjectCategories";
import ProjectList from "../../../../components/page/dashboard/Projects/ProjectList";

class Projects extends Component {
  state = {
    rows: []
  };

  createData = (name, calories, fat, carbs, protein) => {
    let id = 0;
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  };

  render() {
    return (
      <Fragment>
        <ProjectCategories />
        <ProjectList
          rows={[
            this.createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
            this.createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
            this.createData("Eclair", 262, 16.0, 24, 6.0),
            this.createData("Cupcake", 305, 3.7, 67, 4.3),
            this.createData("Gingerbread", 356, 16.0, 49, 3.9)
          ]}
        />
      </Fragment>
    );
  }
}

export default Projects;
