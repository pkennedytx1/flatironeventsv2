import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navagation from './components/Navbar'
import Login from './components/Login'
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
      <div className="App">
        <Navagation user={user} signOut={signOut}/>
        {
          user
            ? <EventCreate user={user} />
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
