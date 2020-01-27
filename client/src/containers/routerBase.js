import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Home from './home';
import Affixes from './affixes';
import Rules from './rules';
import Login from './login';
import Settings from './settings';

export default function RouterBase() {
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/affixes">
          <Affixes />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}