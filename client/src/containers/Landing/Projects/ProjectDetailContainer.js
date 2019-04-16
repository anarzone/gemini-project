import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectDetail } from '../../../actions/projectActions';
import ProjectDetail from '../../../components/page/projects/ProjectDetail';

class ProjectDetailContainer extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    this.props.dispatch(getProjectDetail(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.project !== this.props.project) {
      this.setState({
        data: nextProps.project
      })
    }
  }

  render() {
    return <ProjectDetail project={this.state.data} />
  }
}

const mapStateToProps = state => {
  return {
    project: state.projects.projectDetail
  }
}

export default connect(mapStateToProps)(ProjectDetailContainer);