import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withLang } from '../../../../Hoc/withLang';
import { updateSelectedCategory } from '../../../../actions/projectActions';
import ImagePreview from '../../../../components/widgets/UploadFile/ImagePreview';
import isEmpty from '../../../../validation/is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "../../../../components/widgets/SnackbarContent/SnackbarContent";
import FormDialog from '../../../../components/widgets/FormDialog/FormDialog';

class EditCategory extends Component {
  state = {
    name: '',
    selectedImage: null,
    uploading: false,
    success: false,
    error: false,
    openSnackBar: false,
    responseMessage: ''
  };

  componentWillReceiveProps(nextProps) {
    // if(nextProps.categories.success) {
    //   this.setState({
    //     success: true, 
    //     openSnackBar: true, 
    //     responseMessage: nextProps.categories.success.message
    //   })
    // } 
    if(nextProps.selectedCategory !== this.props.selectedCategory) {
      this.setState({
        name: nextProps.selectedCategory.name
      })
    }
  }

  componentWillUnmount = () => {
    this.setState({ name: '' })
  }

  closeSnackBar = () => {
    this.setState({openSnackBar: false})
  }

  handleChange = event => {
    this.setState({
      name: event.target.value
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
    if(!isEmpty(name)) {
      const formData = new FormData();
      // formData.append('bannerImage', selectedImage);
      // formData.append('name', JSON.stringify(nameData))
      const data = {name}
      console.log('CUCUCU', this.props.selectedCategory._id, this.props.lang, data)
      this.props.dispatch(updateSelectedCategory(this.props.selectedCategory._id, this.props.lang, data));
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
      const { selectedCategory } = this.props;
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
          open={this.props.openDialog}
          onClose={this.props.handleCloseDialog}
          onSubmitForm={e => this.onSubmitFormHandler(e)}
          // isLoading={this.props.categories.isPending}
          title="Kateqoriyanı dəyişdirmək"
        >
          <TextField
            margin='normal'
            id='name'
            label=''
            type='text'
            value={name}
            onChange={(event) => this.handleChange(event)}
            fullWidth
            style={{ marginTop: 22, marginBottom: 22 }}
            required
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
            <div style={{maxWidth: '200px'}}>
              <img src={`assets/images/${selectedCategory.bannerImage}`} alt="" style={{width: '100%'}}/>
            </div>
        </FormDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // categories: state.projectCategories,
  };
};

export default connect(mapStateToProps)(withLang(EditCategory));
