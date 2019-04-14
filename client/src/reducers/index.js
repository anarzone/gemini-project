import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectCategoriesReducer from './projectCategoriesReducer';
import projectsReducer from './projectsReducer';
import localeReducer from './localeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projectCategories: projectCategoriesReducer,
  projects: projectsReducer,
  locale: localeReducer
});
