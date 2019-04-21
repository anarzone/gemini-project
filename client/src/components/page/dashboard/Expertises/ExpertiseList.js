import React from "react";
import { withLang } from '../../../../Hoc/withLang';
import Moment from 'react-moment';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteDialog from '../../../widgets/DeleteDialog/DeleteDialog';

import styles from "./expertisesList.module.css";

class ExpertiseList extends React.Component {

  state = {
    openDialog: false,
    deletedID: null
  }

  truncate = (string) => {
    if (string.length > 100)
       return string.substring(0,100)+'...';
    else
       return string;
  }

  openDeleteDialog = (id) => {
    this.setState({ 
      openDialog: true,
      deletedID: id
    })
  }

  closeDeleteDialog = () => {
    this.setState({ openDialog: false })
  }

  onSubmitDelete = (id) => {
    this.props.deleteExpertise(id)
  }

  render() {
    const { loading, expertises } = this.props;
    return ( loading ? <div style={{textAlign: 'center'}}><CircularProgress /></div> : (  <Paper className={styles.root}>
      <Table className={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell align="left">Fəaliyyətin adı</TableCell>
          <TableCell align="left">Mətn</TableCell>
          <TableCell align="left">Şəkil</TableCell>
          <TableCell align="right">Tənzimləmələr</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {expertises.map((expertise, index) => (
          <TableRow key={index}>
            <TableCell align="left">{expertise.name[this.props.lang]}</TableCell>
            <TableCell align="left">{expertise.content[this.props.lang]}</TableCell>
            <TableCell align="left">{expertise.bannerImage}</TableCell>
            <TableCell align="right">
              <IconButton aria-label="Edit">
                <Edit />
              </IconButton>
              <IconButton aria-label="Delete" onClick={() => this.openDeleteDialog(expertise._id)}>
                <DeleteIcon style={{ color: "#f50057" }} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      <DeleteDialog 
        openDialog={this.state.openDialog} 
        closeDialog={this.closeDeleteDialog} 
        submitDelete={() => this.onSubmitDelete(this.state.deletedID)}
      />
    </Paper> 
      )
    )
  }
}

export default withLang(ExpertiseList);
