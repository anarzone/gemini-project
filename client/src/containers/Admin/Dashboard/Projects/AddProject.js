import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { addProject } from '../../../../actions/projectActions';

import ImagePreview from '../../../../components/widgets/UploadFile/ImagePreview';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import NativeSelect from '@material-ui/core/NativeSelect';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "../../../../components/widgets/SnackbarContent/SnackbarContent";
import Grid from '@material-ui/core/Grid';
import FormDialog from "../../../../components/widgets/FormDialog/FormDialog";
import isEmpty from '../../../../validation/is-empty';


class AddProject extends Component {
  state = {
    openDialog: false,
    name: {
      az: "",
      en: "",
      ru: ""
    },
    content: {
      az: "",
      en: "",
      ru: ""
    },
    category: [],
    selectedImage: null,
    uploading: false,
    success: false,
    error: false,
    openSnackBar: false,
    responseMessage: ''
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.categories !== this.props.categories) {
      this.setState({
        category: nextProps.categories[0]._id
      })
    }

    if(nextProps.projects.success) {
      this.setState({
        success: true, 
        openSnackBar: true, 
        responseMessage: nextProps.projects.success.message
      })
    } 
  }

  closeSnackBar = () => {
    this.setState({openSnackBar: false})
  }

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleChange = (type, lang) => event => {
    this.setState({
      [type] : {
        ...this.state[type],
        [lang]: event.target.value
      }
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      category: event.target.value
    })
  }

  fileChangedHandler = event => {
    this.setState({ selectedImage: event.target.files });
  };

  deleteSelectedImage = selectedIndex => {
    console.log('DELETED', selectedIndex)
    if(this.state.selectedImage !== null) {
      const selectedImage = [...this.state.selectedImage].filter((item, index) => index !== selectedIndex)
      this.setState({
        selectedImage
      })
    }
  }

  onSubmitFormHandler = e => {
    e.preventDefault();
    const { name, content, selectedImage, category } = this.state;
    const nameData = {...name};
    const contentData = {...content};
    if( !isEmpty(nameData.az) && !isEmpty(nameData.en) && !isEmpty(nameData.az) && 
        !isEmpty(contentData.az) && !isEmpty(contentData.en) && !isEmpty(contentData.az) 
        && selectedImage !== null) {
      const formData = new FormData();
      
      for (let i = 0; i < selectedImage.length; i++) {
        let file = selectedImage[i];
        formData.append(`projectImage_${i}`, file);
      }
      
      // formData.append('projectImages', selectedImage);
      formData.append('name', JSON.stringify(nameData))
      formData.append('content', JSON.stringify(contentData))
      console.log('FORM DATA', formData)
      this.props.dispatch(addProject(formData, category));
      this.setState({
        name: {
          en: '',
          az: '',
          ru: ''
        },
        content: {
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
      content, 
      uploading, 
      selectedImage, 
      category,
      openSnackBar, 
      success, 
      responseMessage 
    } = this.state;
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
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <Add />
        </Button>
        <FormDialog open={openDialog} onClose={this.handleClose} onSubmitForm={e => this.onSubmitFormHandler(e)} title="Yeni layihe əlavə et">
          <Grid container spacing={24}>
            <Grid item md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="az"
              label="Layihənin adı - aze"
              type="text"
              value={name.az}
              onChange={this.handleChange("name","az")}
              fullWidth
              style={{ marginTop: 22 }}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="az"
              label="Layihənin mətni - aze"
              type="text"
              value={content.az}
              onChange={this.handleChange("content", "az")}
              fullWidth
              multiline
              rows={15}
              style={{ marginTop: 22, marginBottom: 22  }}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="ru"
              label="Layihənin adı - rus"
              type="text"
              value={name.ru}
              onChange={this.handleChange("name","ru")}
              fullWidth
              style={{ marginTop: 22 }}
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="az"
              label="Layihənin mətni - rus"
              type="text"
              value={content.ru}
              onChange={this.handleChange("content","ru")}
              fullWidth
              multiline
              rows={15}
              style={{ marginTop: 22, marginBottom: 22  }}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6}>
          <TextField
            autoFocus
            margin="dense"
            id="en"
            label="Layihənin adı - eng"
            type="text"
            value={name.en}
            onChange={this.handleChange("name","en")}
            fullWidth
            style={{ marginTop: 22 }}
            variant="outlined"
          />
        <TextField
          autoFocus
          margin="dense"
          id="ru"
          label="Layihənin mətni - eng"
          type="text"
          value={content.en}
          onChange={this.handleChange("content","en")}
          fullWidth
          multiline
          rows={15}
          style={{ marginTop: 22, marginBottom: 22 }}
          variant="outlined"
        />
          </Grid>
          <Grid item md={6}>
          <NativeSelect
          value={category}
          onChange={(e) => this.handleSelectChange(e)}
          name="age"
          style={{width: '100%', marginTop: '34px', marginBottom: '35px', fontSize: '14px'}}
          variant="outlined"
        >
        
          {this.props.categories.map((item, index) => (
            <option key={index} value={item._id}>{item.name.az}</option>
          ))}
        </NativeSelect>
        <Fragment>
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
              Layihə üçün şəkilləri yükləyin!
            </span>
          </label>
        </Fragment>
        {selectedImage && [...selectedImage].map((file, index)=>(
          <ImagePreview key={index} file={file} onDelete={() => this.deleteSelectedImage(index)} />
        ))}
          </Grid>
          </Grid>
        </FormDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps)(AddProject)