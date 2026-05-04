import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


  const firebaseConfig = {
  apiKey: "AIzaSyC1m73TGegOvHt0IZ-bSwVRo1Bb7BfJFnE",
  authDomain: "lab6-11ec4.firebaseapp.com",
  projectId: "lab6-11ec4",
  storageBucket: "lab6-11ec4.firebasestorage.app",
  messagingSenderId: "97504959722",
  appId: "1:97504959722:web:aba2cc2c0a188f0df00513"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);