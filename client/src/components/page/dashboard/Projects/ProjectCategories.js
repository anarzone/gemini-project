import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getSelectedCategory } from '../../../../actions/projectActions';
import { withLang } from '../../../../Hoc/withLang';
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
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCategory from "../../../../containers/Admin/Dashboard/Projects/AddCategory";
import EditCategory from "../../../../containers/Admin/Dashboard/Projects/EditCategory";

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
    openCategoryPopup: false,
    openEditCategory: false
  };

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  openEditCategory = (categoryId, lang) => {
    this.props.dispatch(getSelectedCategory(categoryId, lang))
    this.setState({
      openEditCategory: true
    })

  }

  closeEditCategory = () => {
    this.setState({
      openEditCategory: false
    })
  }

  render() {
    const { classes, categories } = this.props;
    const { tabValue, data, openCategoryPopup, openEditCategory } = this.state;
    return (
      <Card className={styles.myCard}>
        <div className={styles.tableHeading}>
          <h2 className={styles.title}>Kateqoriyalar</h2>
          <AddCategory />
        </div>
        <EditCategory openDialog={openEditCategory} handleCloseDialog={this.closeEditCategory} selectedCategory={this.props.selectedCategory} />
        <Paper className={styles.root}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Kategoriya adı</TableCell>
                <TableCell align="left">Banner şəkli</TableCell>
                <TableCell align="left">Tənzimləmələr</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
  
                  <TableCell align="left">{category.name[this.props.lang]}</TableCell>
                  <TableCell align="left">{category.bannerImage}</TableCell>
                  <TableCell align="left">
                  <IconButton aria-label="edit" onClick={() => this.openEditCategory(category._id, this.props.lang)}>
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
}

const mapStateToProps = state => {
  return {
    selectedCategory: state.projectCategories.selectedCategory
  }
}

export default connect(mapStateToProps)(withStyles(inlineStyle)(withLang(ProjectCategories)));
