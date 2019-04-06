import React from "react";
import PropTypes from "prop-types";
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

import styles from "./projects.module.css";

function ProjectList(props) {
  const { rows } = props;

  return (
    <Card className={styles.myCard}>
      <div className={styles.tableHeading}>
        <h2 className={styles.title}>Proyektlər</h2>
        <AddProject />
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="Delete">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="Delete">
                    <DeleteIcon style={{ color: "#f50057" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
}

export default ProjectList;
