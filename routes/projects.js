const errors = require("restify-errors");
const mongoose = require("mongoose");
const rjwt = require('restify-jwt-community');
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
  server.post("/projects/:id", rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {

    let imageLocation = [];
    if (!req.files) {
      return next(new errors.InvalidContentError("Project image is required"));
    } else {
      // Upload file to client folder
      for (var key in req.files) {
        if (req.files.hasOwnProperty(key)) {
          fs.renameSync(
            req.files[key].path,
            `${__dirname}/../client/public/assets/images/${req.files[key].name}`
          );
          imageLocation.push(`${req.files[key].name}`)
        }
      }
    }
    const name = JSON.parse(req.body.name);
    const content = JSON.parse(req.body.content);
    const cat_id = req.params.id;
    let project = new Project({});
    // Find category by id to add new project
    await ProjectCategory.findById(cat_id, function(err, category){
      if(err) {
        return next(res.send( new errors.NotFoundError(err)))
      }  
      project.category = cat_id;
    })
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
    project.projectImages = imageLocation
    try {
      await project.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get project by id and lang parametres
  server.get("/projects/:id/:lang", async(req, res, next) => {
    const { id, lang} = req.params;
    await Project.findById(id, function(err, project){
      let name = '';
      let content = '';
      if(err) {
        return next(new errors.InvalidContentError(err));
      }
      if(project.get(`name.${lang}`) && project.get(`content.${lang}`)) {
        name = project.get(`name.${lang}`)
        content = project.get(`content.${lang}`)
      } else {
        return next(new errors.InvalidContentError('Lang is not defined'));
      }
      try {
        res.json({ 
          _id: project._id, 
          name,
          content,
          projectImages: project.projectImages,
        })
        next()
      } catch(err) {
        return next(new errors.InvalidContentError(err));
      }
    });

  });

  // Get project by category id
  server.get("/projects/types/:id", async(req, res, next) => {
    const { id } = req.params;
    const project = await Project.find({category: mongoose.Types.ObjectId(id)}, function(err, project){
      if(err) {
        return next(new errors.NotFoundError(err));
      }

      try {
        res.json(project)
        next()
      } catch(err) {
        return next(new errors.InvalidContentError(err));
      }
    })
  });

  // Get project by projectId
  server.get("/projects/:id", async(req, res, next) => {
    const { id } = req.params;
    await Project.findById(id, function(err, project){
      if(err) {
        return next(new errors.NotFoundError(err));
      }
      try {
        res.json(project)
        next()
      } catch(err) {
        return next(new errors.InvalidContentError(err));
      }
    });

  });

  // Remove project by projectId
  server.del("/projects/:id", rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    try {
      const project = await Project.findOneAndRemove({
        _id: req.params.id
      });
      res.send(204);
      next();
    } catch(err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no project with the id of ${req.params.id}`
        )
      );
    }
  });



  // Add new categories for the projects
  server.post("/projects/categories", rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    const name = JSON.parse(req.body.name);
    
    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/${req.files[key].name}`
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

  // Get category by id and lang parametres
  server.get("/projects/categories/:id/:lang", async(req, res, next) => {
    const { id, lang } = req.params;
    await ProjectCategory.findById(id, function(err, category){
      let name = '';
      if(err) {
        return next(new errors.InvalidContentError(err));
      }
      if(category.get(`name.${lang}`)) {
        name = category.get(`name.${lang}`)
      } else {
        return next(new errors.InvalidContentError('Lang is not defined'));
      }
      try {
        res.json({ 
          _id: category._id, 
          name,
          bannerImage: category.bannerImage,
        })
        next()
      } catch(err) {
        return next(new errors.InvalidContentError(err));
      }
    });

  });

  // Update category by id and lang parametres
  server.put("/projects/categories/:id/:lang", rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    try {
      const category = await ProjectCategory.findOneAndUpdate(
        req.params.id,
        (err, doc) => {
          const { lang } = req.params;
          const { name } = JSON.parse(req.body);
          doc.set(`name.${lang}`, name)
        }
      );
      res.json({category});
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no category with the id of ${req.params.id}`
        )
      );
    }
  })

  // Remove category of the project by categoryId
  server.del("/projects/categories/:id", rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    try {
      const category = await ProjectCategory.findOneAndRemove({
        _id: req.params.id
      });
      res.send(204);
      next();
    } catch(err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no category with the id of ${req.params.id}`
        )
      );
    }
  });

};