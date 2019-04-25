import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectCategories } from '../../../actions/projectActions';
import { getExpertises } from '../../../actions/expertiseActions';
import Footer from '../../../components/common/footer/Footer'

class FooterContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getProjectCategories());
    this.props.dispatch(getExpertises());
  }

  render() {
   return (
     <Footer 
      projects={this.props.projects} 
      expertises={this.props.expertises} 
    />
   )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projectCategories.list,
    expertises: state.expertises.list
  }
}

export default connect(mapStateToProps)(FooterContainer);