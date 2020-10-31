import React , {useState, useEffect} from "react";
import './App.css';
import Amplify from 'aws-amplify';
import {configureAmplify} from './service';
import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
import config from "./aws-exports";
import AddIcon from "@material-ui/icons/AddAPhoto"
import { Icon, IconButton, InputAdornment, TextField } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';

import Storage from "@aws-amplify/storage";

Amplify.configure(config);

class App extends React.Component {
 state = {
   imageName:"",
   imageFile:"",
   response:""
 };
 uploadImage = () => {
  Storage.put(`userimages/${this.upload.files[0].name}`,
              this.upload.files[0],
              { contentType: this.upload.files[0].type })
    .then(result => {
      this.upload = null;
      this.setState({ response: "Success uploading file!" });
    })
    .catch(err => {
      this.setState({ response: `Cannot uploading file: ${err}` });
    });
};

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <AmplifySignOut />
          <h1 style = {{color:"Blue"}}>Content here</h1>
          <input
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          ref={ref => (this.upload = ref)}
          onChange={e =>
            this.setState({
              imageFile: this.upload.files[0],
              imageName: this.upload.files[0].name
            })
          }
        />
         <input value={this.state.imageName} placeholder="Select file" />
         <button
          onClick={e => {
            this.upload.value = null;
            this.upload.click();
          }}
          loading={this.state.uploading}
        >
          Browse
        </button>
          <IconButton>
            <PublishIcon label = "Upload file" onClick = {this.uploadImage}/>
          </IconButton>
          {!!this.state.response && <div>{this.state.response}</div>}
        </header>
      </div>
    )
  }
  
}

export default withAuthenticator(App);


