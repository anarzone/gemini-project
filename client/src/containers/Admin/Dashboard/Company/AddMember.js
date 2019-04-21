import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addTeamMember } from '../../../../actions/teamActions';
import ImagePreview from '../../../../components/widgets/UploadFile/ImagePreview';
import isEmpty from '../../../../validation/is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from "@material-ui/core/Snackbar";
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from "../../../../components/widgets/SnackbarContent/SnackbarContent";
import FormDialog from '../../../../components/widgets/FormDialog/FormDialog';

class AddMember extends Component {
  state = {
    name: '',
    position: '',
    openDialog: false,
    selectedImage: null,
    uploading: false,
    success: false,
    error: false,
    openSnackBar: false,
    responseMessage: ''
  };

  componentWillReceiveProps(nextProps) {
    // if(nextProps.expertises.success) {
    //   this.setState({
    //     success: true, 
    //     openSnackBar: true, 
    //     responseMessage: nextProps.expertises.success.message
    //   })
    // } else if(nextProps.expertises.error) {
    //   this.setState({
    //     success: false, 
    //     error: true,
    //     openSnackBar: true, 
    //     responseMessage: nextProps.expertises.error.message
    //   })
    // } 
  }

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  closeSnackBar = () => {
    this.setState({openSnackBar: false})
  }

  handleChange = (id) => event => {
    this.setState({
      [id]: event.target.value
    });
  };

  // File change handler to upload expertise image
  fileChangedHandler = event => {
    console.log(event.target.files[0])
    this.setState({ selectedImage: event.target.files[0] });
  };

  deleteSelectedImage = () => {
    this.setState({
      selectedImage: null
    })
  }

  onSubmitFormHandler = e => {
    e.preventDefault();
    const { name, position, selectedImage } = this.state;
    if(!isEmpty(name) && !isEmpty(position)) {
      const formData = new FormData();
      formData.append('avatar', selectedImage);
      formData.append('name', JSON.stringify(name));
      formData.append('position', JSON.stringify(position));
      console.log('NAME', name, 'CONTENT', position)
      this.props.dispatch(addTeamMember(formData));
      this.setState({
        name: '',
        position: '',
        selectedImage: null
      })
    }
    return false;
  };

  render() {
    const { 
      selectedImage, 
      success, 
      responseMessage, 
      openSnackBar,
      name,
      position
    } = this.state;
    const { openDialog, closeDialog } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={this.closeSnackBar}
        >
          <SnackbarContent
            onClose={this.closeSnackBar}
            variant={success ? 'success' : 'error'}
            message={responseMessage}
          />
        </Snackbar>
        <FormDialog
          open={openDialog}
          onClose={closeDialog}
          onSubmitForm={e => this.onSubmitFormHandler(e)}
          // isLoading={this.props.categories.isPending}
          title="İşçi məlumatlarını əlavə edin"
        >
        <Grid container spacing={24}>
        <Grid item md={12}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="İşçinin adı"
            placeholder="İşçinin adı"
            type="text"
            value={name}
            onChange={this.handleChange("name")}
            fullWidth
            style={{ marginTop: 22 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="position"
            label="İşçinin pozisiyası"
            placeholder="İşçinin pozisiyası"
            type="text"
            value={position}
            onChange={this.handleChange("position")}
            fullWidth
            style={{ marginTop: 22 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
      </Grid>
      <input
        accept='image/*'
        id='contained-button-file'
        type='file'
        style={{ display: 'none' }}
        onChange={this.fileChangedHandler}
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' component='span'>
          Şəkil yüklə
          <CloudUploadIcon style={{ paddingLeft: '4px' }} />
        </Button>
        <span style={{ marginLeft: '6px' }}>
          İşçinin şəklini yükləyin!
        </span>
      </label>
        {/*selectedImage && [...selectedImage].map((file, index)=>(
          <ImagePreview key={index} file={file} onDelete={() => this.deleteSelectedImage(index)} />
        ))*/}
      </Grid>
        </FormDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expertises: state.expertises,
  };
};

export default connect(mapStateToProps)(AddMember);
