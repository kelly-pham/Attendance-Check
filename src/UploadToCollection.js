import React from "react";
import "./App.css";
import Amplify, { API } from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import config from "./aws-exports";
import Storage from "@aws-amplify/storage";
import AddButton from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";
import { IconButton,TextField } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Route, 
    Link, 
  } from "react-router-dom";
import axios from "axios";
Amplify.configure({
  API:{
    endpoints:[{
      name:'face-detection',
      endpoint: 'https://8lsesqd2s7.execute-api.us-east-1.amazonaws.com/test_env'
    }]
  }
});
class UploadToCollection extends React.Component {
    state = {
      imageName: "",
      imageFile: "",
      response: "",
      collectionId:""
    };
  
    uploadImage = () => {
      Storage.put(
        `${this.state.collectionId}/${this.upload.files[0].name}`,
        this.upload.files[0],
        { contentType: this.upload.files[0].type }
      )
        .then((result) => {
          this.upload = null;
          this.setState({ response: "Success uploading file!" });
      //     const api = 'https://8lsesqd2s7.execute-api.us-east-1.amazonaws.com/test_env/addfaces';
      // const data = {collectionId: this.state.collectionId};

      // axios
      // .post(api,data).then((response) => {
      //   console.log(response);
      // }).catch((err) => console.log(err))
      //     console.log(result);
      //     console.log(this.state.response);
        })
        .catch((err) => {
          this.setState({ response: `Cannot uploading file: ${err}` });
        });
        }
  
    render() {
      let upload = <p>{this.state.response}</p>;
      return (
          
        <div className="App">
          <header className="App-header">
            <h1 style={{ color: "#152238" }}>Upload Image to Collection</h1>
            
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              ref={(ref) => (this.upload = ref)}
              onChange={(e) =>
                this.setState({
                  imageFile: this.upload.files[0],
                  imageName: this.upload.files[0].name,
                })
              }
            />
            <div className="user-image">
            <TextField
          id="collection-id"
          placeholder="Enter Class ID"
          type="text"
          onChange={(e) => this.setState({collectionId:e.target.value})}
        />
              
            </div>
            <div>
            <input value={this.state.imageName} placeholder="Filename" />
              <IconButton>
                <AddButton
                  onClick={(e) => {
                    this.upload.value = null;
                    this.upload.click();
                  }}
                  loading={this.state.uploading}
                />
              </IconButton>
            </div>
            
            <Button
              variant="contained"
              color="default"
              onClick={this.uploadImage}
            >
              Upload
            </Button>
            {upload}
          </header>
       
        </div>
      );
    }
  }

  
  export default UploadToCollection;