import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { getTeam, deleteTeamMember } from '../../../../actions/teamActions';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
// COMPONENTS
import CompanyTeam from '../../../../components/page/dashboard/Company/CompanyTeam'
import ExpertiseList from '../../../../components/page/dashboard/Expertises/ExpertiseList';
import AddCompany from './AddCompany';
import AddMember from './AddMember';

import styles from './company.module.css';

class CompanyContainer extends Component {
  state = {
    openTeamDialog: false,
    fetchingTeam: true,
    team: []
  };

  componentDidMount = () => {
    this.props.dispatch(getTeam());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.team !== this.props.team) {
      if(nextProps.team.list) {
        this.setState({
          team: nextProps.team.list,
          fetchingTeam: false
        })
      }
    }
  }

  onDeleteExpertise = (id) => {
    // this.props.dispatch(deleteExpertise(id))
  }

  deleteTeamMember = (id) => {
    this.props.dispatch(deleteTeamMember(id))
  }

  openAddMemberDialog = () => {
    this.setState({openTeamDialog: true})
  }

  closeAddMemberDialog = () => {
    this.setState({ openTeamDialog: false })
  }

  render() {
    return (
      <Fragment>
        <Card className={styles.myCard}>
          <div className={styles.tableHeading}>
            <h2 className={styles.title}>Şirkət haqqında</h2>
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleClickOpenPopup}
            >
              <Edit />
            </Button>
          </div>
        </Card>

        <Card className={styles.myCard}>
          <div className={styles.tableHeading}>
            <h2 className={styles.title}>Şirkətin işçi heyəti</h2>
            <Button
              variant='contained'
              color='primary'
              onClick={this.openAddMemberDialog}
            >
              <Add />
            </Button>
            {/*<CompanyTeam />*/}
          </div>
          <AddMember openDialog={this.state.openTeamDialog} closeDialog={this.closeAddMemberDialog} />
          <CompanyTeam 
            loading={this.state.fetchingTeam} 
            team={this.state.team} 
            deleteTeamMember={this.deleteTeamMember} 
          />
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    team: state.team,
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(CompanyContainer);
