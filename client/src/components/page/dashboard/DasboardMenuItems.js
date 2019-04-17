import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Widgets from "@material-ui/icons/Widgets";
import AddBox from "@material-ui/icons/AddBox";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  parentLink: {
    fontSize: 16,
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "rgba(0, 0, 0, 1)"
  },
  subLink: {
    fontSize: 14,
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "rgba(0, 0, 0, 0.54)"
  },
  expand: {
    position: "absolute",
    right: 15
  }
});

class DasboardMenuItems extends React.Component {
  state = {
    menu: {
      project: {
        openDropdown: false
      },
      expertise: {
        openDropdown: false
      },
      slider: {
        openDropdown: false
      }
    },
    open: true
  };

  handleClick = handle => {
    console.log(handle);
    this.setState({
      menu: {
        ...this.state.menu,
        [handle]: {
          openDropdown:
            this.state.menu[handle].openDropdown === true ? false : true
        }
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { menu } = this.state;
    return (
      <List component="nav" className={classes.root}>
        <ListItem button onClick={() => this.handleClick("project")}>
          <ListItemIcon>
            <Widgets />
          </ListItemIcon>
          <Link to="/dashboard" className={classes.parentLink}>
            Proyektlər
          </Link>
          {/*menu.project.openDropdown ? (
            <ExpandLess className={classes.expand} />
          ) : (
            <ExpandMore className={classes.expand} />
          )*/}
        </ListItem>
        <ListItem button onClick={() => this.handleClick("expertise")}>
          <ListItemIcon><AddBox /></ListItemIcon>
          <Link to="/dashboard/expertises" className={classes.parentLink}>
            Fəaliyyətlər
          </Link>
          
        </ListItem>
        {/*<Collapse in={menu.expertise.openDropdown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <Link to="/" className={classes.subLink}>
                Yeni fəaliyyət
              </Link>
            </ListItem>
          </List>
        </Collapse>*/}
        <ListItem button onClick={() => this.handleClick("slider")}>
          <ListItemIcon><AddBox /></ListItemIcon>
          <Link to="/" className={classes.parentLink}>
            Slider
          </Link>
          {/*menu.slider.openDropdown ? (
            <ExpandLess className={classes.expand} />
          ) : (
            <ExpandMore className={classes.expand} />
          )*/}
        </ListItem>
        {/*<Collapse in={menu.slider.openDropdown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <Link to="/" className={classes.subLink}>
                Yeni slider
              </Link>
            </ListItem>
          </List>
        </Collapse>*/}
      </List>
    );
  }
}

DasboardMenuItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DasboardMenuItems);
