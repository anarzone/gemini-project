import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import {getProjectCategories, getProjects} from '../../../../actions/projectActions';
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
    this.props.dispatch(getProjects());
  }

  render() {
    return (
      <Fragment>
        <ProjectCategories categories={this.props.categories} />
        <ProjectList
          projects={this.props.projects}
          categories={this.props.categories}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.projectCategories.list,
    projects: state.projects.list,
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(Projects);
