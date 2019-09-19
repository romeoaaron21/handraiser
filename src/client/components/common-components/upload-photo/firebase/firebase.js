  import firebase from 'firebase/app';
  import 'firebase/storage';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA0M9wd2Vpb2r3BqTsrCzAzkZQVLfV4czw",
    authDomain: "handraiser-a7468.firebaseapp.com",
    databaseURL: "https://handraiser-a7468.firebaseio.com",
    projectId: "handraiser-a7468",
    storageBucket: "handraiser-a7468.appspot.com",
    messagingSenderId: "794884442943",
    appId: "1:794884442943:web:3d43dc57f4650cfbd8a18a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }