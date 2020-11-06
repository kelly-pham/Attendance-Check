import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import ProcessImage from "./ProcessImage";
import "../App.css";

export default function FaceComparison() {
  const [collectionId, setCollectionId] = useState("");

  const submitHandler = () => {
    const value = {
      CollectionId: collectionId,
    };
    console.log(value);
    console.log(collectionId);
    setCollectionId(collectionId);

    // document.getElementById("collection-id").value = "";
  };

  const imageHandler = () => {
    document.getElementById("fileToUpload").addEventListener(
      "change",
      function (event) {
        ProcessImage(collectionId);
      },
      false
    );
  };

  return (
    <div className="check">
      <header className="App-header">
      <h1>Please type in class ID:</h1>
          <TextField
            id="collection-id"
            placeholder="Enter Class ID"
            type="text"
            onChange={(e) => setCollectionId(e.target.value)}
            style = {{
              paddingBottom:10
            }}
          />
       
           <Button
            variant="contained"
            color="primary"
            onClick={submitHandler}
          >
            Enter
          </Button>
       
       
         <br></br>
          <div>
            <input
              type="file"
              name="fileToUpload"
              id="fileToUpload"
              accept="image/*"
              onClick={imageHandler}
              style = {{
                marginBottom:10
              }}
            />
          </div>

          <p id="faceResult"></p>
        </header>
      </div>
    
  );
}
