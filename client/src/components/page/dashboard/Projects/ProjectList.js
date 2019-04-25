import React, { Component } from "react";
import { withLang } from '../../../../Hoc/withLang';
import Moment from 'react-moment';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddProject from "../../../../containers/Admin/Dashboard/Projects/AddProject";
import DeleteDialog from '../../../widgets/DeleteDialog/DeleteDialog';


import styles from "./projects.module.css";

class ProjectList extends Component {

  state = {
    openDialog: false,
    deletedID: null
  }
  
truncate = (string) => {
    if (string.length > 100)
       return string.substring(0,100)+'...';
    else
       return string;
 };

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
  this.props.deleteProject(id)
}

  render() {
    return (
      <Card className={styles.myCard}>
        <div className={styles.tableHeading}>
          <h2 className={styles.title}>Proyektlər</h2>
          <AddProject categories={this.props.categories} />
        </div>
        <Paper className={styles.root}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Proyektin adı</TableCell>
                <TableCell align="left">Mətn</TableCell>
                <TableCell align="left">Yaranma tarixi</TableCell>
                <TableCell align="left">Şəkillər</TableCell>
                <TableCell align="right">Tənzimləmələr</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{project.name[this.props.lang]}</TableCell>
                  <TableCell align="left">{this.truncate(project.content[this.props.lang])}</TableCell>
                  <TableCell align="left"><Moment date={project.createdAt} format="YYYY/MM/DD" /></TableCell>
                  <TableCell align="left">{`${project.projectImages.length} şəkil`}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="Edit">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.openDeleteDialog(project._id)}>
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
      </Card>
    );
  }
}

export default withLang(ProjectList);
