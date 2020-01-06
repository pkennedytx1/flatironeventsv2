import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navagation from './components/Navbar'
import Login from './components/Login'
import Data from './components/Data'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './base';
// import { Router, Route, Switch } from 'react-router'
import EventCreate from './components/EventCreate'

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends React.Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <Router>
      <div className="App">
        <Navagation user={user} signOut={signOut}/>
        {
          user
            ?
            <div>
              <Route path='/new'>
                <EventCreate user={user} />
              </Route>
              <Route path='/'>
                <Data />
              </Route>
            </div>
             :
            <Route exact path='/'>
              <Login signInWithGoogle={signInWithGoogle} />
            </Route> 
          }
      </div>
      </Router>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
