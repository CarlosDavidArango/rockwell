import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCZ4rfYRnMLexXCWm8lQF6E1aamys71-xA",
    authDomain: "rockwellemployee-9facf.firebaseapp.com",
    projectId: "rockwellemployee-9facf",
    storageBucket: "rockwellemployee-9facf.appspot.com",
    messagingSenderId: "130281618262",
    appId: "1:130281618262:web:070dc3f5dd5d51814534f7",
    measurementId: "G-5TG7PC80WY"
  };


initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();