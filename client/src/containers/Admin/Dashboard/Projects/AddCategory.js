import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addProjectCategory } from '../../../../actions/projectActions';
import isEmpty from '../../../../validation/is-empty';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
    uploading: false
  };

  componentWillReceiveProps(nextProps) {
    
  }

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

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

  onSubmitFormHandler = e => {
    e.preventDefault();
    const { name, selectedImage } = this.state;
    const nameData = {
        az: '',
        en: '',
        ru: ''      
      };
    if(!isEmpty(name.az) && !isEmpty(name.en) && !isEmpty(name.ru) && selectedImage !== null) {
      nameData['az'] = name.az;
      nameData['en'] = name.en;
      nameData['ru'] = name.ru;
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
    const { openDialog, name, uploading, selectedImage } = this.state;
    const { az, en, ru } = name;

    const contentImageUpload = () => {
      switch (true) {
        case uploading:
          return 'Yuklenir...';
        case selectedImage !== null:
          return selectedImage.name;
        default:
          return (
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
                  Kateqoriya üçün yalnız bir şəkil seçə bilərsiniz!
                </span>
              </label>
            </Fragment>
          );
      }
    };
    console.log(this.props.categories)
    return (
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleClickOpen}
        >
          <Add />
          Yeni kateqoriya əlavə et
        </Button>
        <FormDialog
          open={openDialog}
          onClose={this.handleClose}
          onSubmitForm={e => this.onSubmitFormHandler(e)}
          isLoading={this.props.categories.isPending}
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
          />

          {contentImageUpload()}
        </FormDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.projects.categories
  };
};

export default connect(mapStateToProps)(AddCategory);
