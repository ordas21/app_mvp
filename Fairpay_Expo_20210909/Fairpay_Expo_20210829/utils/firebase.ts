import * as firebase from 'firebase';
import 'firebase/auth';
import * as FirebaseCore from 'expo-firebase-core';

console.log(FirebaseCore.DEFAULT_APP_OPTIONS);

firebase.initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS as object);

export default firebase;
