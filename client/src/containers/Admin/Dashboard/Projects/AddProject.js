import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import FormDialog from "../../../../components/widgets/FormDialog/FormDialog";

class AddProject extends Component {
  state = {
    openDialog: false,
    name: {
      az: "",
      en: "",
      ru: ""
    }
  };

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleChange = name => event => {
    this.setState({
      name: {
        [name]: event.target.value
      }
    });
  };

  render() {
    const { openDialog, name } = this.state;
    const { az, en, ru } = name;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <Add />
          Yeni proyekt əlavə et
        </Button>
        <FormDialog open={openDialog} onClose={this.handleClose}>
          <TextField
            autoFocus
            margin="dense"
            id="az"
            label="Proyektin adı - aze"
            type="text"
            value={az}
            onChange={this.handleChange("az")}
            fullWidth
            style={{ marginTop: 22 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="en"
            label="Proyektin adı - eng"
            type="text"
            value={en}
            onChange={this.handleChange("en")}
            fullWidth
            style={{ marginTop: 22 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="ru"
            label="Proyektin adı - rus"
            type="text"
            value={ru}
            onChange={this.handleChange("ru")}
            fullWidth
            style={{ marginTop: 22, marginBottom: 22 }}
          />
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Şəkil yüklə
            </Button>
          </label>
        </FormDialog>
      </div>
    );
  }
}

export default AddProject;
