import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { getExpertises, deleteExpertise } from '../../../../actions/expertiseActions';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
// COMPONENTS
import ExpertiseList from '../../../../components/page/dashboard/Expertises/ExpertiseList';
import AddExpertise from './AddExpertise';

import styles from './expertises.module.css';

class ExpertiseContainer extends Component {
  state = {
    openPopup: false,
    isFetchingExpertises: true,
  };

  componentDidMount = () => {
    this.props.dispatch(getExpertises());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.expertises !== this.props.expertises) {
      if(!nextProps.expertises.isPending) {
        this.setState({
          isFetchingExpertises: false
        })
      }
    }
  }

  onDeleteExpertise = (id) => {
    this.props.dispatch(deleteExpertise(id))
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
        <ExpertiseList 
          loading={this.state.isFetchingExpertises} 
          expertises={this.props.expertises.list} 
          deleteExpertise={this.onDeleteExpertise}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    expertises: state.expertises,
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(ExpertiseContainer);
