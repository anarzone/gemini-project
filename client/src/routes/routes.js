import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

// COMPONENTS
import Home from "../components/page/home/Home";
import Projects from "../components/page/projects/Projects";
// ADMIN PAGES
import AdminLogin from "../containers/Admin/AdminLogin";
import ProjectList from "../containers/Admin/Dashboard/Projects/ProjectList";

const Routes = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/projects" component={Projects} />

    <Route path="/admin" component={AdminLogin} />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={ProjectList} />
    </Switch>
  </div>
);

export default Routes;
