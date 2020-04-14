import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "<your-firebase-api-key>",
    authDomain: "<your-authDomain>",
    databaseURL: "<your-databaseURL> ",
    projectId: "<your-projectId>",
    storageBucket: "<your-storageBucket>",
    messagingSenderId: "your-messagingSenderId",
    appId: "<your-api-id>",
    measurementId: "<your-measurementId>"
  };

 export const firebaseApp = firebase.initializeApp(firebaseConfig);

 //!database reference
 export const goalRef = firebase.database().ref('goals');
 export const completeGoalRef = firebase.database().ref('completedGoals');
