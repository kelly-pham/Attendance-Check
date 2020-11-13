import React, { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5),
      
    },
  },
}));


export default function ListFiles() {
  const classes = useStyles();
  const [id, setID] = useState("");
  const [data, setData] = useState([]);
  const [img,setImg] = useState([]);


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
            Storage.get(element["key"]).then(result => {
              setImg((img) => [...img,result]);
            }).catch(err => console.log(err));
            setData((data) => [...data, element["key"]]);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(`data is ${data}`);
   
  }, [data]);
  useEffect(() => {
    console.log(`image is ${img}`);
 
  }, [img]);

  // useEffect(()=>{
  //   Storage.get(data).then(data =>{
  //     SetImg(data);
  //   })
  // });

  return (
    <div className="App">
      <div className="App-header">
        <h1 style={{ color: "#152238" }}>List Student in Class</h1>
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

<ul>
{data.map((item,index) => {
  let name = item.split("/")[1];
 
return <li>{index +1} - {name.split(".").slice(0, -1).join(".")} <Avatar alt={name} src={img[index]}  style={{ height: '70px', width: '70px', marginLeft:"120px" }} /></li>
   



})}
</ul>




          </div>
         
      
    </div>
  );
}
