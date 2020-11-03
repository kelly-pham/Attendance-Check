import { ProcessCredentials } from 'aws-sdk';
import awsmobile from "./aws-exports";

require('dotenv');

let AWS = require('aws-sdk');

export default function ProcessImage() {
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
          credentials:{
            accessKeyId: process.env.AWS_AccessKey,
            secretAccessKey: process.env.AWS_SecretAccessKey
          }
        });
        
        let params = {
          Image: {
          Bytes: e.target.result
        },
        Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data) {
        console.log(params);
        console.log(JSON.stringify(data, null, '\t'));
      //if (err) console.log(err, err.stack); // an error occurred
      //else {
    //    var table = "<table><tr><th>Low</th><th>High</th></tr>";
    //     // show each face and build out estimated age table
    //     for (var i = 0; i < data.FaceDetails.length; i++) {
    //       table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
    //         '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
    //     }
    //     table += "</table>";
    //     document.getElementById("faceResult").innerHTML = table;
     // }
    });

      };
    })(file);
    reader.readAsArrayBuffer(file);
  }
function AnonLog() {
  
  // AWS.config = new AWS.Config();
  //   AWS.config.update({
  //     accessKeyId: process.env.AWS_AccessKey,
  //     secretAccessKey: process.env.AWS_SecretAccessKey,

  //   });
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:141dc64c-f266-4a4a-b225-2d6553497854'
    });
    //Make the call to obtain credentials
    AWS.config.credentials.get(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
    });
  }


