import React from "react";
import { Switch, Route } from "react-router-dom";

// COMPONENTS
import Home from "./components/page/home/Home";
import Projects from "./components/page/projects/Projects";
// AUTHENTICATION COMPONENT
import AdminLogin from "./containers/Admin/AdminLogin";

const Routes = () => (
  <Switch>
    <Route path="/admin" component={AdminLogin} />
    <Route
      path="/admin/dashboard"
      render={() => {
        "salam";
      }}
    />
    <Route path="/" exact component={Home} />
    <Route path="/projects" component={Projects} />
  </Switch>
);

export default Routes;
