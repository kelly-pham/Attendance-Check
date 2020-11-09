import React from "react";
import "../App.css";
import Amplify, { Auth } from "aws-amplify";
import Storage from "@aws-amplify/storage";
import AddButton from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";
import { IconButton, TextField } from "@material-ui/core";
import "../App.css";

// Amplify.configure({
//   API: {
//     endpoints: [
//       {
//         name: "face-detection",
//         endpoint:
//           "https://8lsesqd2s7.execute-api.us-east-1.amazonaws.com/test_env",
//       },
//     ],
//   },
// });


class UploadToCollection extends React.Component {
  state = {
    imageName: "",
    imageFile: "",
    response: "",
    collectionId: ""
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
        alert(this.state.response);
      })
      .catch((err) => {
        this.setState({ response: `Cannot uploading file: ${err}` });
      });
      
  };
  


  render() {
    let upload = <p>{this.state.response}</p>;
    console.log(Auth.user.username);
    
    return (
      <div className="add">
        <header className="App-header">
          <h1 style={{ color: "#152238" }}>Upload Image to Collection</h1>

          <input
            type="file"
            onFocus="this.value=''"
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
              onChange={(e) => this.setState({ collectionId: e.target.value })}
              style = {{
                paddingBottom:10
              }}
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
            color="primary"
            onClick={this.uploadImage}
            
          >
            Upload
          </Button>
          
        </header>
 
      </div>
    );
  }
}

export default UploadToCollection;
