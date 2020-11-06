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
      <div className="App-header">
        <h1>Please type in class ID:</h1>
      </div>
      <div>
        <form>
          <TextField
            id="collection-id"
            placeholder="Enter Class ID"
            type="text"
            onChange={(e) => setCollectionId(e.target.value)}
          />
          <Button onClick={submitHandler}>Submit</Button>
          <div>
            <input
              type="file"
              name="fileToUpload"
              id="fileToUpload"
              accept="image/*"
              onClick={imageHandler}
            />
          </div>

          <p id="faceResult"></p>
        </form>
      </div>
    </div>
  );
}
