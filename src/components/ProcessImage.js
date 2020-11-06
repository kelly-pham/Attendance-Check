require("dotenv");


let AWS = require("aws-sdk");
var BucketName = 'image-store115601-dev';
var s3 = new AWS.S3({
  params:{Bucket: BucketName},
        //   credentials:{
        //   accessKeyId: process.env.AWS_AccessKey,
        //   secretAccessKey: process.env.AWS_SecretAccessKey
        // },
});
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
        FaceMatchThreshold: 85,
        Image: {
          Bytes: e.target.result,
        },
        MaxFaces: 1,
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
            // Define S3 bucket 
          var s3Bucket = 'https://image-store115601-dev.s3.amazonaws.com/public/';
        
       
          let table = `<h1>Faces found in ${collectionId}</h1><table id = 'faces-table'><tr><th style = "text-align:center">ID</th><th style = "text-align:center">Names</th><th style = "text-align:center">Image Link</th></tr>`;
          let face_array = data.FaceMatches.length;
          if (face_array !== 0) {
            for (var i = 0; i < face_array; i++) {
              let id = i+1;
              
              let externalImageID =
                data.FaceMatches[i]["Face"]["ExternalImageId"];
              let name = externalImageID.split("-")[2];
              console.log(name);
              
              var params = {
                Bucket: BucketName,
                Key: `public/${collectionId}/${name}`,
        //         credentials:{
        //   accessKeyId: process.env.AWS_AccessKey,
        //   secretAccessKey: process.env.AWS_SecretAccessKey
        // },
        Expires: 5 * 60
              };
              // var generate_url = s3.getSignedUrl('getObject',params);
              // console.log(generate_url);
              //var url = `<a href = '${generate_url}'>View Face</a>`;
              var imageLink = `<a href = '${s3Bucket}${collectionId}/${name}>View Face</a>`;
              table += "<tr><td>" + id + "</td><td>" + name.split(".")[0] + "</td><td>" + imageLink + "</td></tr>";
            }
            table += "</table>";
            document.getElementById("faceResult").innerHTML = table;

            // let test = data.FaceMatches.Face.ExternalImageId;
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
