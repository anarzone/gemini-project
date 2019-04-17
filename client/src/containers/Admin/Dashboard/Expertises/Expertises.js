import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
// COMPONENTS
import ExpertiseList from '../../../../components/page/dashboard/Expertises/ExpertiseList';
import AddExpertise from './AddExpertise';

import styles from './expertises.module.css';

class ExpertiseContainer extends Component {
  state = {
    openPopup: false
  };

  componentDidMount = async () => {
    
  }

  handleClickOpenPopup = () => {
    this.setState({openPopup: true})
  }

  handleClickClosePopup = () => {
    this.setState({ openPopup: false })
  }

  render() {
    return (
      <Card className={styles.myCard}>
        <div className={styles.tableHeading}>
          <h2 className={styles.title}>Fəaliyyət sahələri</h2>
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleClickOpenPopup}
          >
            <Add />
          </Button>
        </div>
        <AddExpertise openDialog={this.state.openPopup} closeDialog={this.handleClickClosePopup} />
        <ExpertiseList />
      </Card>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     categories: state.projectCategories.list,
//     projects: state.projects.list,
//     lang: state.locale.lang
//   }
// }

export default connect()(ExpertiseContainer);
