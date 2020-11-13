import { Storage } from "@aws-amplify/storage";
import { useState } from "react";
require("dotenv");

let AWS = require("aws-sdk");
// var BucketName = 'image-store115601-dev';
// var s3 = new AWS.S3({
//   params:{Bucket: BucketName},
//         //   credentials:{
//         //   accessKeyId: process.env.AWS_AccessKey,
//         //   secretAccessKey: process.env.AWS_SecretAccessKey
//         // },
// });
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
        region: "us-east-1",
        // credentials:{
        //   accessKeyId: process.env.AWS_AccessKey,
        //   secretAccessKey: process.env.AWS_SecretAccessKey
        // }
      });

      let params = {
        CollectionId: collectionId,
        FaceMatchThreshold: 80,
        Image: {
          Bytes: e.target.result,
        },
        MaxFaces: 200,
      };
      rekognition.searchFacesByImage(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }

        if (err) {
          console.log(err);
        } else {
          let name1 = "";
          let face_array = data.FaceMatches.length;
          console.log(face_array);
          if (face_array !== 0) {
            for (var i = 0; i < face_array; i++) {
              let externalImageID =
                data.FaceMatches[i]["Face"]["ExternalImageId"];
              let name = externalImageID.split("-")[2];
              name1 = name;
              console.log(name1);
              var test_link = `${collectionId}/${name1}`;
              console.log(test_link);
              Storage.get(test_link)
                .then((result) => {
                  console.log(result);
                  return result;
                })
                .catch((err) => console.log(err))
                .then(function (result) {
                  let table = `<h1>Faces found in ${collectionId}</h1><table id = 'faces-table'><tr><th style = "text-align:center">ID</th><th style = "text-align:center">Names</th><th style = "text-align:center">Image Link</th></tr>`;
                  let face_array = data.FaceMatches.length;
                  if (face_array !== 0) {
                    for (var i = 0; i < face_array; i++) {
                      let id = i + 1;

                      let externalImageID =
                        data.FaceMatches[i]["Face"]["ExternalImageId"];
                      let name = externalImageID.split("-")[2];
                      console.log(name);
                      var imageLink = `<a href = ${JSON.stringify(
                        result
                      )} target='_blank'>View Face</a>`;
                      console.log(imageLink);
                      table +=
                        "<tr><td>" +
                        id +
                        "</td><td>" +
                        name.split(".")[0] +
                        "</td><td>" +
                        imageLink +
                        "</td></tr>";
                    }
                    table += "</table>";
                    document.getElementById("faceResult").innerHTML = table;
                  }
                });
            }
          }
        }
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
  AWS.config.region = "us-east-1"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:0dd9eb36-1090-4bcb-a212-031629597745",
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
