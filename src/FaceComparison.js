import React, { useState, useEffect, useCallback } from "react";
import AddButton from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Amplify, { API } from "aws-amplify";
import awsmobile from "./aws-exports";
import AWS from "aws-sdk";
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

    document.getElementById("fileToUpload").addEventListener(
      "change",
      function (event) {
        ProcessImage();
      },
      false
    );

    document.getElementById("collection-id").value = "";
  };

  return (
    <div className="App">
      <div className="App-header">
        <TextField
          id="collection-id"
          placeholder="Enter Class ID"
          type="text"
          onChange={(e) => setCollectionId(e.target.value)}
        />
        <input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          accept="image/*"
          
        />
        
        <p id="faceResult"></p>
        <Button onClick={submitHandler}>Submit</Button>
      </div>
    </div>
  );
}
