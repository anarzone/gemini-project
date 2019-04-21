import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectCategoriesReducer from './projectCategoriesReducer';
import projectsReducer from './projectsReducer';
import expertiseReducer from './expertiseReducer';
import teamReducer from './teamReducer';
import localeReducer from './localeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projectCategories: projectCategoriesReducer,
  projects: projectsReducer,
  expertises: expertiseReducer,
  team: teamReducer,
  locale: localeReducer
});
