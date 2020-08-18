import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

/* 页面路由地址引入 start */
import Home from "../views/Index.jsx";

export default class MainRouter extends Component {
  render() {
    return (
      <HashRouter basename="">
        <div id="inner">
          <Route exact path="/" component={Home} />
        </div>
      </HashRouter>
    );
  }
}
