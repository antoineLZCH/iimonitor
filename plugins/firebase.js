import firebase from 'firebase/app'
import firebaseConf from '~/firebase.config.js'
import 'firebase/firestore';
// import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConf)
}
const fireDb = firebase.firestore()
const fieldValue = firebase.firestore.FieldValue;

export {
  fireDb,
  fieldValue
};
