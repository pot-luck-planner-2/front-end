import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import axios from 'axios';

import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import PotLuckForm from './components/PotLuckForm.js';
import UpdatingPotLuck from './components/UpdatingPotluck.js';
import PotLuckContext from './contexts/PotLuckContext.js';

import './App.css';

function App () {
  const [potLucks, setPotLucks] = useState([]);

  return (
    <PotLuckContext.Provider value= {{potLucks, setPotLucks}}>
      <Router>
        <Switch>
          <Route path='/login'>
            <LoginForm/>
          </Route>
          <Route path='/register'>
            <SignUpForm/>
          </Route>
          <PrivateRoute exact path='/potluck-form' component={ PotLuckForm }/>
          <PrivateRoute path='/edit-potluck' component={ UpdatingPotLuck }/>
        </Switch>
      </Router>
    </PotLuckContext.Provider>
  );
}

export default App;