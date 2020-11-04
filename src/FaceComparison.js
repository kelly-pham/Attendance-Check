import React, { useState, useEffect, useCallback } from "react";
import AddButton from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Amplify, { API } from "aws-amplify";
import awsmobile from "./aws-exports";
import AWS, { ProcessCredentials } from "aws-sdk";
import ProcessImage from "./ProcessImage";


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

  const imageHandler = () =>{
        document.getElementById("fileToUpload").addEventListener(
      "change",
      function (event) {
        ProcessImage(collectionId);
      },
      false
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <p>Please type in class ID:</p>
        <form>
        <TextField
          id="collection-id"
          placeholder="Enter Class ID"
          type="text"
          onChange={(e) => setCollectionId(e.target.value)}
        />
        <Button onClick={submitHandler}>Submit</Button>
        <div><input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          accept="image/*"
          onClick={imageHandler}
        /></div>
        
        
        <p id="faceResult"></p>
        
        </form>
        
      </div>
    </div>
  );
}
