import React, { useState, useEffect } from "react";
import "./App.css";
import Amplify from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UploadToCollection from "./UploadToCollection";
import FaceComparison from "./FaceComparison";
import Home from "./Home";
import config from "./aws-exports";
import { MenuItem, MenuList } from "@material-ui/core";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
Amplify.configure(config);

function App() {
const [click, setClick] = useState(false);
const [dropdown, setDropdown] = useState(false);

const onMouseIn = () => {
  if (window.innerWidth < 960){
    setDropdown(false);
  } else{
    setDropdown(true);
  }
};

const onMouseOut = () => {
  if (window.innerWidth < 960){
    setDropdown(false);
  } else{
    setDropdown(false);
  }
};

  return (
    <Router history={history}>
      <div className = "App-header">
      <AmplifySignOut />
      </div>
      <div className="flex-container">
          <ul id="nav-bar">
            <li>
              <Link to="/home" className="nav-items">
                HOME
              </Link>
            </li>
            <li onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
              <Link to="/collection" className="nav-items">
                Upload Image to Collection <i className="fas fa-caret-down"></i>
              </Link>         
            </li>
            <li>
              <Link to="/face_comparison" className="nav-items">
                Face Comparison
              </Link>
            </li>
          </ul>
        <hr />
        <div className="App">
        <Switch>

          <Route exact path="/">
            <div className = "App-header">
            <Home />
            </div>
            
          </Route>
          <Route path="/collection">
            <div className="collection">
              <UploadToCollection />
            </div>
          </Route>

          <Route exact path="/face_comparison">
            <div className = "App-header">
            <FaceComparison />
            </div>
            </Route>
        </Switch>
        </div>
        
      </div>
    </Router>
 
  );
}

export default withAuthenticator(App);
