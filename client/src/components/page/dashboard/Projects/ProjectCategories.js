import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import AddCategory from "../../../../containers/Admin/Dashboard/Projects/AddCategory";

import styles from "./projects.module.css";

// Inline style for tabs
const inlineStyle = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8"
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontSize: 16,
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

class ProjectCategories extends Component {
  state = {
    tabValue: 0,
    data: [
      {
        title: {
          az: "Azerbaijan",
          en: "English",
          ru: "Russian"
        }
      },
      {
        title: {
          az: "Azerbaijan 2",
          en: "English 2",
          ru: "Russian 2"
        }
      },
      {
        title: {
          az: "Azerbaijan 3",
          en: "English 3",
          ru: "Russian 3"
        }
      }
    ],
    openCategoryPopup: false
  };

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    const { classes } = this.props;
    const { tabValue, data, openCategoryPopup } = this.state;
    return (
      <Card className={styles.myCard}>
        <div className={styles.tableHeading}>
          <h2 className={styles.title}>Kateqoriyalar</h2>
          {/*<Tabs
            value={tabValue}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="AZE"
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="ENG"
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="RUS"
            />
          </Tabs>*/}
          <AddCategory />
        </div>
        <Paper className={styles.root}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Kategoriya adı</TableCell>
                <TableCell align="right">Banner şəkli</TableCell>
                <TableCell align="right">Tənzimləmələr</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {tabValue === 0 ? row.title.az : row.title.en}
                  </TableCell>
                  <TableCell align="right">{row.title.az}</TableCell>
                  <TableCell align="right">{row.title.az}</TableCell>
                  <TableCell align="right">Delete || Edit</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    );
  }
}

export default withStyles(inlineStyle)(ProjectCategories);
