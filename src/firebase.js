import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAs3ykdtVwfgOaChgZ4xTbbUYZQbbST4YY",
    authDomain: "goal-coach-34b05.firebaseapp.com",
    databaseURL: "https://goal-coach-34b05.firebaseio.com",
    projectId: "goal-coach-34b05",
    storageBucket: "goal-coach-34b05.appspot.com",
    messagingSenderId: "612567823413",
    appId: "1:612567823413:web:7ec0d67f40d137a2346d7c",
    measurementId: "G-PGEBP3F64S"
  };

 export const firebaseApp = firebase.initializeApp(firebaseConfig);

 //!database reference
 export const goalRef = firebase.database().ref('goals');
 export const completeGoalRef = firebase.database().ref('completedGoals');