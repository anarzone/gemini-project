import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginAdmin } from "../../actions/authActions";
import isEmpty from "../../validation/is-empty";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SnackbarContent from "../../components/widgets/SnackbarContent/SnackbarContent";
import styles from "./adminLogin.module.css";

class AdminLogin extends React.Component {
  state = {
    formData: {
      email: "",
      password: ""
    },
    openErrorBar: false,
    buttonDisable: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }

    if (!isEmpty(nextProps.errors) && nextProps.errors !== {}) {
      this.setState({
        openErrorBar: true,
        buttonDisable: false
      });
    } else {
      this.setState({ openErrorBar: false });
    }
  }

  handleChange = name => event => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: event.target.value.trim()
      }
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const formData = {
      ...this.state.formData
    };
    if (formData.email.length !== 0 && formData.password.length !== 0) {
      this.props.dispatch(loginAdmin(formData));
      this.setState({ buttonDisable: true });
    }
  };

  handleClose = (event, reason) => {
    this.setState({ openErrorBar: false });
  };

  render() {
    console.log("PROPS ON LOGIN ROUTE", this.props);
    return (
      <div className={styles.root}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.openErrorBar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            onClose={this.handleClose}
            variant="error"
            message="Email və ya parolu düzgün daxil edin!"
          />
        </Snackbar>
        <Card className={styles.card}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={e => this.onSubmitHandler(e)}
          >
            <TextField
              label="Email"
              className={styles.textField}
              type="email"
              value={this.state.formData.email}
              onChange={this.handleChange("email")}
              autoComplete="current-email"
              margin="normal"
            />
            <TextField
              label="Password"
              className={styles.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={this.state.formData.password}
              onChange={this.handleChange("password")}
            />
            <Button
              variant="contained"
              color="primary"
              className={styles.loginBtn}
              type="submit"
              disabled={this.state.buttonDisable}
            >
              {this.state.buttonDisable ? "Yüklənir..." : "Daxil ol"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, errors: state.errors };
};

export default connect(mapStateToProps)(withRouter(AdminLogin));
