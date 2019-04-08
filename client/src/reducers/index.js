import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectsReducer from './projectsReducer';
import localeReducer from './localeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projects: projectsReducer,
  locale: localeReducer
});
