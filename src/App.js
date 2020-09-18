import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import axios from 'axios';

import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';

import './App.css';

function App () {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/register'>
          <SignUpForm/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;