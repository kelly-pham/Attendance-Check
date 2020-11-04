import { Face, PhoneCallback } from '@material-ui/icons';
import { ProcessCredentials } from 'aws-sdk';
import { useCallback } from 'react';
import awsmobile from "./aws-exports";

require('dotenv');

let AWS = require('aws-sdk');

export default function ProcessImage(collectionId) {
    AnonLog();
    var control = document.getElementById("fileToUpload");
    var file = control.files[0];

    // Load base64 encoded image for display 
    let reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
          console.log(e);
          console.log(e.target.result);
        //Call Rekognition  
        AWS.region = "us-east-1";  
        let rekognition = new AWS.Rekognition({
          region:'us-east-1',
          // credentials:{
          //   accessKeyId: process.env.AWS_AccessKey,
          //   secretAccessKey: process.env.AWS_SecretAccessKey
          // }
        });
        
        let params = {
          CollectionId:collectionId,
          FaceMatchThreshold:85,
          Image: {
          Bytes: e.target.result
        },
        MaxFaces: 1
    };
    rekognition.searchFacesByImage(params, function (err, data) {
        if(err) {
          console.log(err,err.stack);
        }else{
          console.log(data);
        }

        if(err){
          console.log(err);
        }else{
          let table = `<table><tr><th>Searching faces in class ${collectionId}...</th></tr></table>`;
          let face_array = data.FaceMatches.length;
          if(face_array !== 0){
            for (var i = 0; i< face_array; i++){
              console.log(data.FaceMatches[i]['Face']['ExternalImageId']);
            }
            // let test = data.FaceMatches.Face.ExternalImageId;
          }
          
          document.getElementById('faceResult').innerHTML = table;
        }
        
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else {
    //    var table = "<table><tr><th>Low</th><th>High</th></tr>";
    //     // show each face and build out estimated age table
    //     for (var i = 0; i < data.FaceDetails.length; i++) {
    //       table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
    //         '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
    //     }
    //     table += "</table>";
    //     document.getElementById("faceResult").innerHTML = table;
    //  }
    });

      };
    })(file);
    reader.readAsArrayBuffer(file);
  }
function AnonLog() {
  
  // AWS.config = new AWS.Config();
    // AWS.config.update({
    //   accessKeyId: process.env.AWS_AccessKey,
    //   secretAccessKey: process.env.AWS_SecretAccessKey,

    // });
    // Configure the credentials provider to use your identity pool
   // Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:0dd9eb36-1090-4bcb-a212-031629597745',
});
    // //Make the call to obtain credentials
    // AWS.config.credentials.get(function () {
    //   // Credentials will be available when this function is called.
    //   var accessKeyId = process.env.AWS_AccessKey;
    //   var secretAccessKey = process.env.AWS_SecretAccessKey;
      
    // });
    // Make the call to obtain credentials
    AWS.config.credentials.get(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
    });
  }


