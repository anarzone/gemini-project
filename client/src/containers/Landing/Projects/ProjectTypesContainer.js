import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectCategories } from '../../../actions/projectActions';
import ProjectTypes from '../../../components/page/projects/ProjectTypes';

class ProjectTypesContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getProjectCategories())
  }

  render() {
    return <ProjectTypes categories={this.props.categories.list} />
  }
}

const mapStateToProps = state => {
  return {
    categories: state.projectCategories
  }
}

export default connect(mapStateToProps)(ProjectTypesContainer);