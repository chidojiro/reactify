import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDrh_HauM4PpUjuroREMbYjSXA9klvJp-s",
    authDomain: "mp3-angular4.firebaseapp.com",
    databaseURL: "https://mp3-angular4.firebaseio.com",
    projectId: "mp3-angular4",
    storageBucket: "mp3-angular4.appspot.com",
    messagingSenderId: "220425624941"
  };

firebase.initializeApp(config);

export default firebase;