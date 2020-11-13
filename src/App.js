import React, { useState } from "react";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignIn, AmplifySignOut } from "@aws-amplify/ui-react";
import UploadToCollection from "./components/UploadToCollection";
import FaceComparison from "./components/FaceComparison";
import config from "./aws-exports";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ListFile from "./components/ListFile";


Amplify.configure(config);
Auth.configure(config);
function App() {
  console.log(Auth.user.username);
  return (
    <div>
      <AmplifySignOut />
      <Router history={history}>
        <Navbar />
        <Switch>
         
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route path="/add">
            <div className="add">
              <UploadToCollection />
            </div>
          </Route>

          <Route exact path="/check">
            <div className="check">
              <FaceComparison />
            </div>
          </Route>
          <Route exact path="/list">
            <div className="list">
              <ListFile />
            </div>
          </Route>

          <Route exact path="/signin">
            <div className="App">
              <AmplifySignIn />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
