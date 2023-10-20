// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// .env 사용하지 않은경우
// const firebaseConfig = {
//   apiKey: "AIzaSyDVQx8_EuVgA7zuy900FtgZlypeSW3SVfo",
//   authDomain: "nwitter-19df0.firebaseapp.com",
//   projectId: "nwitter-19df0",
//   storageBucket: "nwitter-19df0.appspot.com",
//   messagingSenderId: "36406489889",
//   appId: "1:36406489889:web:b8848bf464731bb17d8460"
// };


// .env사용한 경우
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
  };


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth(firebaseApp);