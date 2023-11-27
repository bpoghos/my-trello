import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBmV0kU8hV1e2UZp7GWpHDW8V_TZfNq9l8",
    authDomain: "my-trello-c81d3.firebaseapp.com",
    projectId: "my-trello-c81d3",
    storageBucket: "my-trello-c81d3.appspot.com",
    messagingSenderId: "266246351935",
    appId: "1:266246351935:web:d00b764f38966944e95c8a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, app, db }



