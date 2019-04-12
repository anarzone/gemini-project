import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { setLocale } from '../../../actions/localeActions';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DasboardMenuItems from "../../page/dashboard/DasboardMenuItems";
// import SimpleLineChart from "./SimpleLineChart";
// import SimpleTable from "./SimpleTable";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto",
    paddingTop: 80
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  langBtn: {
    fontSize: 14,
    marginLeft: 4
  },
  activeButton: {
    borderColor: '#4caf50'
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    langButton: {
      az: true,
      en: false,
      ru: false
    }
  };

  componentDidMount() {
    if(localStorage.geminiLang) {
      this.changeActiveButtonStyle(localStorage.geminiLang)
    }
  }


  onChangeLang = (lang) => {
    this.changeActiveButtonStyle(lang)
    this.props.dispatch(setLocale(lang));
  }

  changeActiveButtonStyle = (lang) => {
    if(lang === 'az') {
      this.setState({
        langButton: {
          ...this.state.langButton,
          az: true,
          en: false,
          ru: false
        }
      })
    } else if(lang === 'en') {
      this.setState({
        langButton: {
          ...this.state.langButton,
          az: false,
          en: true,
          ru: false
        }
      })
    } else if(lang === 'ru') {
      this.setState({
        langButton: {
          ...this.state.langButton,
          az: false,
          en: false,
          ru: true
        }
      })
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { langButton } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              GEMINI - Admin
            </Typography>
            <Button variant="outlined" color="inherit" className={langButton.az ? [classes.langBtn, classes.activeButton].join(' ') : classes.langBtn} onClick={() => this.onChangeLang('az')}>
              AZE
            </Button>
            <Button variant="outlined" color="inherit" className={langButton.en ? [classes.langBtn, classes.activeButton].join(' ') : classes.langBtn} onClick={() => this.onChangeLang('en')}>
              ENG
            </Button>
            <Button variant="outlined" color="inherit" className={langButton.ru ? [classes.langBtn, classes.activeButton].join(' ') : classes.langBtn} onClick={() => this.onChangeLang('ru')}>
              RUS
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <DasboardMenuItems />
        </Drawer>
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
