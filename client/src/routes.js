import React from "react";
import { Switch, Route } from "react-router-dom";

// COMPONENTS
import Home from "./components/page/home/Home";
import Projects from "./components/page/projects/Projects";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/projects" component={Projects} />
  </Switch>
);

export default Routes;
