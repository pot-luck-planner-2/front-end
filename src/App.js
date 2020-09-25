import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';

import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';

import UpdatingPotLuck from './components/UpdatingPotluck.js';
import PotLuckContext from './contexts/PotLuckContext.js';
import Dashboard from './Dashboard/Dashboard';

import './App.css';

function App () {
  const [potLucks, setPotLucks] = useState([]);

  return (
    <PotLuckContext.Provider value= {{potLucks, setPotLucks}}>
      <Router>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/register'>
          <SignUpForm/>
        </Route>
        <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
        <PrivateRoute path='/edit-potluck' component={ UpdatingPotLuck }/>
      </Router>
    </PotLuckContext.Provider>
  );
}

export default App;