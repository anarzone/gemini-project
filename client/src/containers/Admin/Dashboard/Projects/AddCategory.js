import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addProjectCategory } from '../../../../actions/projectActions';
import ImagePreview from '../../../../components/widgets/UploadFile/ImagePreview';
import isEmpty from '../../../../validation/is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "../../../../components/widgets/SnackbarContent/SnackbarContent";
import FormDialog from '../../../../components/widgets/FormDialog/FormDialog';

class AddCategory extends Component {
  state = {
    openDialog: false,
    name: {
      az: '',
      en: '',
      ru: ''
    },
    selectedImage: null,
    uploading: false,
    success: false,
    error: false,
    openSnackBar: false,
    responseMessage: ''
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.categories.success) {
      this.setState({
        success: true, 
        openSnackBar: true, 
        responseMessage: nextProps.categories.success.message
      })
    } 
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

  handleChange = name => event => {
    this.setState({
      name: {
        ...this.state.name,
        [name]: event.target.value
      }
    });
  };

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
    const { name, selectedImage } = this.state;
    const nameData = {...name};
    if(!isEmpty(name.az) && !isEmpty(name.en) && !isEmpty(name.ru) && selectedImage !== null) {
      console.log(nameData)
      const formData = new FormData();
      formData.append('bannerImage', selectedImage);
      formData.append('name', JSON.stringify(nameData))
      console.log('FORM DATA', formData)
      this.props.dispatch(addProjectCategory(formData));
      this.setState({
        name: {
          ...name,
          en: '',
          az: '',
          ru: ''
        },
        selectedImage: null
      })
    }
    return false;
  };

  render() {
    const { 
      openDialog, 
      name, 
      uploading, 
      selectedImage, 
      success, 
      responseMessage, 
      openSnackBar 
    } = this.state;
    const { az, en, ru } = name;

    
    console.log(this.props.categories)
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
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleClickOpen}
        >
          <Add />
        </Button>
        <FormDialog
          open={openDialog}
          onClose={this.handleCloseDialog}
          onSubmitForm={e => this.onSubmitFormHandler(e)}
          isLoading={this.props.categories.isPending}
          title="Yeni kategoriya elave et"
        >
          <TextField
            margin='dense'
            id='az'
            label='Kateqoriya adı - aze'
            type='text'
            value={az}
            onChange={this.handleChange('az')}
            fullWidth
            style={{ marginTop: 22 }}
            variant="outlined"
          />
          <TextField
            margin='dense'
            id='en'
            label='Kateqoriya adı - eng'
            type='text'
            value={en}
            onChange={this.handleChange('en')}
            fullWidth
            style={{ marginTop: 22 }}
            variant="outlined"
          />
          <TextField
            margin='dense'
            id='ru'
            label='Kateqoriya adı - rus'
            type='text'
            value={ru}
            onChange={this.handleChange('ru')}
            fullWidth
            style={{ marginTop: 22, marginBottom: 22 }}
            variant="outlined"
          />
          
          <div style={{display: 'flex', alignItems: 'center'}}>
              <input
                accept='image/*'
                id='contained-button-file'
                multiple
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
                  Kateqoriya üçün yalnız bir şəkil seçmə imkanınız var.
                </span>
              </label>
            </div>
            {selectedImage && <ImagePreview file={selectedImage} onDelete={() => this.deleteSelectedImage()}  />}
        </FormDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.projectCategories,
  };
};

export default connect(mapStateToProps)(AddCategory);
