import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addExpertise } from '../../../../actions/expertiseActions';
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

class AddExpertise extends Component {
  state = {
    type: {
      az: '',
      en: '',
      ru: ''
    },
    content: {
      az: '',
      en: '',
      ru: ''
    },
    openDialog: false,
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

  handleChange = (name, lang) => event => {
    this.setState({
      [name]: {
        [lang]: event.target.value.trim()
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
    const { type, content, selectedImage } = this.state;
    if(!isEmpty(type.az) && !isEmpty(type.en) && !isEmpty(type.ru) && !isEmpty(content.az) && !isEmpty(content.en) && !isEmpty(content.ru)) {
      console.log(type)
      const formData = new FormData();
      formData.append('bannerImage', selectedImage);
      formData.append('type', JSON.stringify(type))
      formData.append('content', JSON.stringify(content))
      console.log('FORM DATA', formData)
      this.props.dispatch(addExpertise(formData));
      this.setState({
        type: {
          az: '',
          en: '',
          ru: ''
        },
        content: {
          az: '',
          en: '',
          ru: ''
        },
        selectedImage: null
      })
    }
    return false;
  };

  render() {
    const { 
      uploading, 
      selectedImage, 
      success, 
      responseMessage, 
      openSnackBar,
      content,
      type
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
          type="Yeni kategoriya elave et"
        >
        <Grid container spacing={24}>
        <Grid item md={6}>
        <TextField
          autoFocus
          margin="dense"
          id="az"
          label="Fəaliyyət adı - aze"
          placeholder="Fəaliyyət adı - aze"
          type="text"
          value={type.az}
          onChange={this.handleChange("type","az")}
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
          id="az"
          label="Fəaliyyət mətni - aze"
          placeholder="Fəaliyyət mətni - aze"
          type="text"
          value={content.az}
          onChange={this.handleChange("content", "az")}
          fullWidth
          multiline
          rows={15}
          style={{ marginTop: 22, marginBottom: 22  }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          autoFocus
          margin="dense"
          id="ru"
          label="Fəaliyyət adı - rus"
          placeholder="Fəaliyyət adı - rus"
          type="text"
          value={type.ru}
          onChange={this.handleChange("type","ru")}
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
          id="ru"
          label="Fəaliyyət mətni - rus"
          placeholder="Fəaliyyət mətni - rus"
          type="text"
          value={content.ru}
          onChange={this.handleChange("content","ru")}
          fullWidth
          multiline
          rows={15}
          style={{ marginTop: 22, marginBottom: 22  }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item md={6}>
      <TextField
        autoFocus
        margin="dense"
        id="en"
        label="Fəaliyyət adı - eng"
        placeholder="Fəaliyyət adı - eng"
        type="text"
        value={type.en}
        onChange={this.handleChange("type","en")}
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
        id="en"
        label="Fəaliyyət mətni - eng"
        placeholder="Fəaliyyət mətni - eng"
        type="text"
        value={content.en}
        onChange={this.handleChange("content","en")}
        fullWidth
        multiline
        rows={15}
        style={{ marginTop: 22, marginBottom: 22 }}
        InputLabelProps={{
            shrink: true,
          }}
        variant="outlined"
      />
      </Grid>
      <Grid item md={6}>
        <NativeSelect
          //value={}
          onChange={(e) => this.handleSelectChange(e)}
          name="age"
          style={{width: '100%', marginTop: '34px', marginBottom: '35px', fontSize: '14px'}}
          variant="outlined"
        >
      
      {/*this.props.categories.map((item, index) => (
        <option key={index} value={item._id}>{item.name.az}</option>
      ))*/}
    </NativeSelect>
    <Fragment>
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
          Layihə üçün şəkilləri yükləyin!
        </span>
      </label>
    </Fragment>
    {/*selectedImage && [...selectedImage].map((file, index)=>(
      <ImagePreview key={index} file={file} onDelete={() => this.deleteSelectedImage(index)} />
    ))*/}
      </Grid>
      </Grid>
        </FormDialog>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     categories: state.projectCategories,
//   };
// };

export default connect()(AddExpertise);
