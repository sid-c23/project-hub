import Rebase from 're-base';
import firebase from 'firebase';
//
// const config = {
//     apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DB_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.envREACT_APP_SENDER_ID
//   }

const config = {
  apiKey: "AIzaSyCmRZGk5mZVAtPvQy-73DPKrtbsYV8qL6k",
  authDomain: "project-hub-45d3c.firebaseapp.com",
  databaseURL: "https://project-hub-45d3c.firebaseio.com",
  projectId: "project-hub-45d3c",
  storageBucket: "project-hub-45d3c.appspot.com",
  messagingSenderId: "614276738088"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, base, googleProvider }
