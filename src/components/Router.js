import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";


export default () => {
    //hooks
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Switch>
                {/* {isLoggedIn ? show home : show login page} */}
                {isLoggedIn ? (
                <>
                <Route exact path="/">
                    <Home/>
                </Route>
                </> ) : ( 
                <Route exact path="/">
                    <Auth/> 
                </Route> 
                )}
            </Switch>
        </Router>
    )

}