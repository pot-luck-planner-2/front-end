import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';

import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import Dashboard from './Dashboard/Dashboard';

import './App.css';

function App () {
  return (
    <Router>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/register'>
          <SignUpForm/>
        </Route>
        <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
    </Router>
  );
}

export default App;