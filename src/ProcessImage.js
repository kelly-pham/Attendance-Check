import AWS from "aws-sdk";
require('dotenv').config();
function DetectFaces(imageData) {
    const AWS_Config = {
        accessKeyId: process.env.AWS_AccessKey,
        accessSecretKey: process.env.AWS_AWS_SecretAccessKey,
        region: "us-east-1"
    }

  // Create AWS Rekognition isntance
AWS.config.update(AWS_Config);
  let rekognition = new AWS.Rekognition();
  let params = {
    Image: {
      Bytes: imageData,
    },
    Attributes: ["ALL"],
  };
  rekognition.detectFaces(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
        console.log(params);
        console.log(data);
      let table = "<table><tr><th>Low</th><th>High</th></tr>";
      // show each face and build out estimated age table
      for (let i = 0; i < data.FaceDetails.length; i++) {
        table +=
          "<tr><td>" +
          data.FaceDetails[i].AgeRange.Low +
          "</td><td>" +
          data.FaceDetails[i].AgeRange.High +
          "</td></tr>";
      }
      table += "</table>";
      document.getElementById("faceResult").innerHTML = table;
    }
  });
}

export default function ProcessImage() {
  console.log("Did called");
  let control = document.getElementById("fileToUpload");
  let file = control.files[0];

  // Load Base64 image encoder
  let reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (event) {
      let img = document.createElement("img");
      let image = null;
      img.src = event.target.result;
      let jpg = true;
      try {
        image = atob(event.target.result.split("data:image/jpg;base64,")[1]);
      } catch (error) {
        jpg = false;
      }
      if (jpg == false) {
        try {
          image = atob(event.target.result.split("data:image/png;base64,")[1]);
        } catch (error) {
          alert("Not the image AWS Rekognition can process. Please try again");
          return;
        }
      }

      // Unencode Image Bytes for Rekognition API
      let length = image.length;
      let imageBytes = new ArrayBuffer(length);
      let ua = new Uint8Array(imageBytes);
      for (var i = 0; i < length; i++) {
        ua[i] = image.charCodeAt(i);
      }

      // Call Rekognition
      DetectFaces(imageBytes);
    };
  })(file);

  reader.readAsDataURL(file);
}


