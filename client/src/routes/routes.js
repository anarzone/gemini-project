import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// COMPONENTS
import Home from "../components/page/home/Home";
import ProjectsPage from "../components/page/projects/Projects";
// DASHBOARD
import AdminLogin from "../containers/Admin/AdminLogin";
import Projects from "../containers/Admin/Dashboard/Projects/Projects";

const Routes = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/projects" component={ProjectsPage} />

    <Route path="/admin" component={AdminLogin} />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Projects} />
    </Switch>
  </div>
);

export default Routes;
