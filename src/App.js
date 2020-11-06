import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UploadToCollection from "./components/UploadToCollection";
import FaceComparison from "./components/FaceComparison";
import config from "./aws-exports";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

Amplify.configure(config);

function App() {
  return (
    <div>
      <Router history={history}>
      <Navbar />
      <Switch>

          <Route exact path="/" component={Home}></Route>
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
      <div className = "App-header">
      </div>
    </Router>
    </div>
    
 
  );
}

export default withAuthenticator(App);
