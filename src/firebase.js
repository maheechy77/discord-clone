// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAQzfV7V3bog4ASTaUd2BLSC2xp--KiIjU",
	authDomain: "discord-clone-b53cd.firebaseapp.com",
	databaseURL: "https://discord-clone-b53cd.firebaseio.com",
	projectId: "discord-clone-b53cd",
	storageBucket: "discord-clone-b53cd.appspot.com",
	messagingSenderId: "191821962056",
	appId: "1:191821962056:web:7b6c2c442d43d04184717d",
	measurementId: "G-Q5XL7F5TKQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default db;
