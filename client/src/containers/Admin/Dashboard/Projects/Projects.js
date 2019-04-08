import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import {getProjectCategories} from '../../../../actions/projectActions';
import ProjectCategories from "../../../../components/page/dashboard/Projects/ProjectCategories";
import ProjectList from "../../../../components/page/dashboard/Projects/ProjectList";
import projectMessages from './projectMessages';

class Projects extends Component {
  state = {
    rows: [],
    categories: []
  };

  componentDidMount = async () => {
    this.props.dispatch(getProjectCategories());
  }

  createData = (name, calories, fat, carbs, protein) => {
    let id = 0;
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  };


  render() {
    return (
      <Fragment>
        <ProjectCategories categories={this.props.categories.data} />
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

const mapStateToProps = state => {
  return {
    categories: state.projects.categories.categoriesList,
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(Projects);
