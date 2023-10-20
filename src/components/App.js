import React, { useState } from "react";
import { Router } from "react-router-dom/cjs/react-router-dom.min";
import AppRouter from "components/Router";
// import firebase from "fbase";
import {authService} from "fbase";

function App() {
  console.log(authService.currentUser);
    //hooks
    // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
