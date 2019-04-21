import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// LANDING
import Home from "../components/page/home/Home";
import ProjectTypesContainer from "../containers/Landing/Projects/ProjectTypesContainer";
import ProjectsContainer from "../containers/Landing/Projects/ProjectsContainer";
import ProjectDetailContainer from "../containers/Landing/Projects/ProjectDetailContainer";
import ExpertisesContainer from "../containers/Landing/Expertises/ExpertisesContainer";
import ExpertiseDetailContainer from "../containers/Landing/Expertises/ExpertiseDetailContainer";
import About from "../components/page/about/About";
import Contact from "../components/page/contact/Contact";
// DASHBOARD
import AdminLogin from "../containers/Admin/AdminLogin";
import Projects from "../containers/Admin/Dashboard/Projects/Projects";
import ExpertiseContainer from '../containers/Admin/Dashboard/Expertises/Expertises';

const Routes = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/projects" exact component={ProjectTypesContainer} />
    <Route path="/projects/types/:id" exact component={ProjectsContainer} />
    <Route path="/projects/:id" exact component={ProjectDetailContainer} />
    <Route path="/expertises" exact component={ExpertisesContainer} />
    <Route path="/expertises/:id" exact component={ExpertiseDetailContainer} />
    <Route path="/contact" exact component={Contact} />

    <Route path="/admin" component={AdminLogin} />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Projects} />
      <PrivateRoute exact path="/dashboard/expertises" component={ExpertiseContainer} />
    </Switch>
  </div>
);

export default Routes;
