import React, {useState} from "react";
import "./App.css";
import Amplify,{Auth} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UploadToCollection from "./components/UploadToCollection";
import FaceComparison from "./components/FaceComparison";
import config from "./aws-exports";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

Amplify.configure(config);

function App() {
  console.log(Auth.user.username);
  return (
    <div>
      <Router history={history}>
      <Navbar />
      <Switch>
          <Route exact path="/" component={Home}>

          </Route>
          <Route path="/add">
            <div className="add">
              <UploadToCollection />
            </div>
          </Route>

          <Route exact path="/check">
            <div className = "check">
            <FaceComparison />
            </div>
            </Route>
        </Switch>
    </Router>
    
    </div>
    
 
  );
}

export default withAuthenticator(App);
