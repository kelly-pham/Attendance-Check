import React, { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function ListFiles() {
  const [id, setID] = useState("");
  const [data, setData] = useState([]);

  const clickHandler = () => {
    console.log(id);
    console.log(data);
    Storage.list("")
      .then((result) => {
        console.log(result);
        result.forEach((element) => {
          // Search for classID
          if (element["key"].split("/")[0] === id) {
            console.log(element["key"]);
            setData((data) => [...data, element["key"]]);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="App">
      <div className="App-header">
        <h1 style={{ color: "#152238" }}>List Images in Class</h1>
      </div>
      <div className="user-image">
        <TextField
          id="collection-id"
          placeholder="Enter Class ID"
          type="text"
          onChange={(e) => setID(e.target.value)}
          style={{
            paddingBottom: 10,
          }}
        />
      </div>
      <Button variant="contained" color="primary" onClick={clickHandler}>
        Enter
      </Button>
          <div className='list-face-collection'>
          <p>Face Collection in class {id} has {data.length} face(s)</p>

{data.map((item,index) => {
  let name = item.split("/")[1];
    
return <ul><li>{index +1} - {name.split(".").slice(0, -1).join(".")}</li></ul>;
})}
          </div>
         
      
    </div>
  );
}
