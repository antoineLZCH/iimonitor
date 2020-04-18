import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyAVL-LNlXRZYoZF9g2hDapN2lF2JN9ki4k',
  authDomain: 'iimonitor.firebaseapp.com',
  databaseURL: 'https://iimonitor.firebaseio.com',
  projectId: 'iimonitor',
  storageBucket: 'iimonitor.appspot.com',
  messagingSenderId: '942441004379',
  appId: '1:942441004379:web:3a5908f1dbba1a87deee7e'
}

firebase.initializeApp(config)