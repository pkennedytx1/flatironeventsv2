import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navagation from './components/Navbar'
import Login from './components/Login'
import { Router, Route, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './base';

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
      <div className="App">
        <Navagation />
        {
          user
            ? <Button cariant='primary' onClick={signOut}>Sign out</Button>
            : <Login signInWithGoogle={signInWithGoogle} />
        }
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
