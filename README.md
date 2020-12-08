# Atendance Checker using AWS Clouds Services

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description
An attempt to solve the attendance checker through Zoom screenshot by using AWS Rekognition Face Comparison feature. 

## Architecture Diagram & Components
![](misc\cloud.png)

* Front-end: React
* Back-end: AWS [Amplify](https://aws.amazon.com/amplify/?nc=sn&loc=0) + [S3](https://aws.amazon.com/s3/) (for storing image uploaded by user) + [Cognito](https://aws.amazon.com/cognito/) (Authentication) + [Lambda](https://aws.amazon.com/lambda/) (where we add Faces to the Face Collection)

## Deployment
* Local:
```javascript
    npm start
```
* Cloud: Install Amplify using CLI (more details can be found [here](https://docs.amplify.aws/cli/start/install)) 
```javascript
    npm install -g @aws-amplify/cli
```
Configure Amplify
```javascript
    amplify configure
```
A AWS Console Sign-in page will pop up. Once signed in, Amplify will ask to specify AWS region, IAM user (access key + secret key) and Cognito authentication.

To initialize Amplify
```javascript
    amplify init
```
To update Amplify
```javascript
    amplify push
```
To check what services is installed with Amplify
```javascript
    amplify status
```

After installing Amplify, copy all source code and update Amplify.


## Future Works
* Enhancing the Face Comparison feature (two approaches: one is migrating to Google Cloud Vision API and compare, or create a model that can detect and save faces constrained to Zoom screenshot)
* Scailing up by leveraging AWS Amplify + graphQL + DynamoDB to create a user database.
* More responsive UI.
