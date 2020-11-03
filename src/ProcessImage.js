
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
        let rekognition = new AWS.Rekognition();
        let binary = '';
        let byte = new Uint8Array(e.target.result);
        let len = byte.byteLength;
        for (var i = 0; i<len;i++){
            binary += String.fromCharCode(byte[i]);
        }
        console.log(binary);
        let params = {
          Image: {
          Bytes: new Bytes(e.target.result)
        },
        Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data) {
        console.log(params);
        console.log(data.FaceDetails);
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
    
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.Credentials({
      IdentityPoolId: 'us-east-1:c747123e-aa75-43eb-81e5-10e2db013e4e',
    });
    // Make the call to obtain credentials
    AWS.config.credentials.get(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
    });
  }


