import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedExpertise } from '../../../actions/expertiseActions';
import ExpertiseDetail from '../../../components/page/expertises/ExpertiseDetail';

class ExpertiseDetailContainer extends Component {

  state = {
    selectedExpertise: {},
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(getSelectedExpertise(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.expertises !== this.props.expertises) {
      if(!nextProps.expertises.isPending) {
        this.setState({ loading: false })
      }
      if(nextProps.expertises.selectedExpertise) {
        this.setState({ selectedExpertise: nextProps.expertises.selectedExpertise})
      }
    }
  }

  render() {
    return <ExpertiseDetail loading={this.state.loading} expertise={this.state.selectedExpertise} />
  }
}

const mapStateToProps = state => {
  return {
    expertises: state.expertises
  }
}

export default connect(mapStateToProps)(ExpertiseDetailContainer);