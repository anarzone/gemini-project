import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectByCategory } from '../../../actions/projectActions';
import Projects from '../../../components/page/projects/Projects';

class ProjectTypesContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getProjectByCategory(this.props.match.params.id))
  }

  render() {
    console.log(this.props)
    return <Projects projects={this.props.projects.selectedProject} />
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(ProjectTypesContainer);