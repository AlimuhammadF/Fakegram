// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBlIe5JevLnmFbegZctnNOTgXjnOuGXQA4",
	authDomain: "fakegram-e6635.firebaseapp.com",
	projectId: "fakegram-e6635",
	storageBucket: "fakegram-e6635.appspot.com",
	messagingSenderId: "630264810686",
	appId: "1:630264810686:web:0a56e39d549b52b027e2ef",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();

const auth = getAuth();

export { app, storage, db, auth };
