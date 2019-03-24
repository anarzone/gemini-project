import React from "react";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SnackbarContent from "../../components/widgets/SnackbarContent/SnackbarContent";
import styles from "./adminLogin.module.css";

class AdminLogin extends React.Component {
  state = {
    email: "",
    password: "",
    open: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div className={styles.root}>
        <Button onClick={this.handleClick}>Open success snackbar</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            onClose={this.handleClose}
            variant="error"
            message="This is a success message!"
          />
        </Snackbar>
        <Card className={styles.card}>
          <form noValidate autoComplete="off">
            <TextField
              label="Email"
              className={styles.textField}
              type="email"
              autoComplete="current-email"
              margin="normal"
            />
            <TextField
              label="Password"
              className={styles.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className={styles.loginBtn}
            >
              Daxil ol
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

export default AdminLogin;
