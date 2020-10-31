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
import config from "./aws-exports";
import { MenuItem, MenuList } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route, 
  Link, 
} from "react-router-dom";

Amplify.configure(config);

 export default function Home() {
  
    return (
        <div>
            <h1>HomePage</h1>
        </div>
    );
  }

