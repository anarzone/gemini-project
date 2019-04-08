import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// COMPONENTS
import Home from "../components/page/home/Home";
import ProjectsPage from "../components/page/projects/Projects";
import Expertises from "../components/page/expertises/Expertises";
import ExpertiseDetail from "../components/page/expertises/ExpertiseDetail";
import About from "../components/page/about/About";
// DASHBOARD
import AdminLogin from "../containers/Admin/AdminLogin";
import Projects from "../containers/Admin/Dashboard/Projects/Projects";

const Routes = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/projects" exact component={ProjectsPage} />
    <Route path="/expertises" exact component={Expertises} />
    <Route path="/expertises/detail" exact component={ExpertiseDetail} />


    <Route path="/admin" component={AdminLogin} />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Projects} />
    </Switch>
  </div>
);

export default Routes;
