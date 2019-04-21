import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpertises } from '../../../actions/expertiseActions';
import Expertises from '../../../components/page/expertises/Expertises';

class ExpertisesContainer extends Component {

  state = {
    fetchingExpertises: true,
    expertiseList: []
  }

  componentDidMount() {
    this.props.dispatch(getExpertises())
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.expertises !== this.props.expertises) {
      if(!nextProps.expertises.isPending) {
        this.setState({ fetchingExpertises: false })
      }
      if(nextProps.expertises.list.length > 0) {
        this.setState({ expertiseList: nextProps.expertises.list })
      }
    }
  }

  render() {
    return (
      <Expertises loading={this.state.fetchingExpertises} expertises={this.state.expertiseList} />
    )
  }
};

const mapStateToProps = state => {
  return {
    expertises: state.expertises
  }
}

export default connect(mapStateToProps)(ExpertisesContainer);