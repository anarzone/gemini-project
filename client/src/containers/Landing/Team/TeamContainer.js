import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeam } from '../../../actions/teamActions';
import TeamSection from '../../../components/page/about/AboutTeam';

class TeamContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getTeam());
  }

  render() {
    return (
      <TeamSection data={this.props.team} />
    )
  }
}

const mapStateToProps = state => {
  return {
    team: state.team.list
  }
}

export default connect(mapStateToProps)(TeamContainer);