const errors = require("restify-errors");
const mongoose = require("mongoose");
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const ProjectCategory = require("../models/ProjectCategory");
const Project = require("../models/Project");

module.exports = server => {
  // Get all projects
  server.get("/projects", async (req, res, next) => {
    const projects = await Project.find({});
    next();
    try {
      res.send(projects);
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Create new project
  server.post("/projects", async (req, res, next) => {

    let imageLocation = [];


    if (!req.files) {
      return next(new errors.InvalidContentError("Project image is required"));
    }else{
      // Upload file to client folder
      for (var key in req.files) {
        if (req.files.hasOwnProperty(key)) {
          fs.renameSync(
            req.files[key].path,
            `${__dirname}/../client/public/assets/images/projects/${req.files[key].name}`
          );
          imageLocation.push(`${req.files[key].name}`)
        }
      }
    }
    const name = JSON.parse(req.body.name);
    const content = JSON.parse(req.body.content);
    let project = new Project();
    // Find category by id to add new project
    ProjectCategory.findOne({ _id: req.body.cat_id })
      .then(category => {
        project.name = {
          az: name.az,
          en: name.en,
          ru: name.ru
        }
        project.content = {
          az: content.az,
          en: content.en,
          ru: content.ru
        }
        project.category = category
        project.projectImages = imageLocation
      })
      .catch(err => {
        return next(res.send( new errors.NotFoundError(err)))
      })
    try {
      await project.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Add new categories for the projects
  server.post("/projects/categories", async (req, res, next) => {
    const name = JSON.parse(req.body.name);
    
    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/projects/${req.files[key].name}`
        );
      }
    }
    if (!req.files.bannerImage) {
      return next(new errors.InvalidContentError("Banner image for category is required"));
    }
    const category = new ProjectCategory({});
    category.name = {
      az: name.az,
      en: name.en,
      ru: name.ru
    }
    category.bannerImage = `${req.files.bannerImage.name}`
    try {
      const newCategory = await category.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get all project categories
  server.get("/projects/categories", async (req, res, next) => {
    const categories = await ProjectCategory.find({});
    try {
      res.send(categories);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err.message));
    }
  });
};
Collapse



5:24 PM
AddProject.js 
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { getProjectCategories, addProject } from '../../../../actions/projectActions';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import NativeSelect from '@material-ui/core/NativeSelect';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    category: null,
    selectedImage: null,
    uploading: false,
  };

  componentDidMount() {
    this.props.dispatch(getProjectCategories());
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

  onSubmitFormHandler = e => {
    e.preventDefault();
    const { name, content, selectedImage } = this.state;
    const nameData = {...name};
    const contentData = {...content};
    if(selectedImage !== null) {
      const formData = new FormData();
      
      const imageLocation = [];
      for (let i = 0; i < selectedImage.length; i++) {
        let file = selectedImage[i];
      
        formData.append(`projectImage_${i}`, file);
      }
      console.log('SELECTED IMAGE', selectedImage);
      
      // formData.append('projectImages', selectedImage);
      formData.append('name', JSON.stringify(nameData))
      formData.append('content', JSON.stringify(contentData))
      console.log('FORM DATA', formData)
      this.props.dispatch(addProject(formData));
      // this.setState({
      //   name: {
      //     ...name,
      //     en: '',
      //     az: '',
      //     ru: ''
      //   },
      //   selectedImage: null
      // })
    }
    return false;
  };

  render() {
    const { openDialog, name, content, uploading, selectedImage } = this.state;
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
    console.log(this.props.categories.data[0])
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <Add />
          
        </Button>
        <FormDialog open={openDialog} onClose={this.handleClose} onSubmitForm={e => this.onSubmitFormHandler(e)} title="Yeni layihe əlavə et">
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
            style={{ marginTop: 22, marginBottom: 22  }}
          />
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
            style={{ marginTop: 22, marginBottom: 22  }}
          />
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
            style={{ marginTop: 22, marginBottom: 22 }}
          />
          <NativeSelect
            // value={}
            onChange={(e) => this.handleSelectChange(e)}
            name="age"
            style={{width: '100%', marginTop: '22px', marginBottom: '35px', fontSize: '14px'}}
          >
            {this.props.categories.data.map((item, index) => (
              <option key={index} value={item._id}>{item.name.az}</option>
            ))}
          </NativeSelect>
          {contentImageUpload()}
        </FormDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.projects.categories.categoriesList
  };
};

export default connect(mapStateToProps)(AddProject);