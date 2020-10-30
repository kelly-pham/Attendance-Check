import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from "./aws-exports";
import {AmplifySiggOut, withAuthenticator} from "@aws-amplify/ui-react";

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySiggOut />
        <h1>Content here</h1>
        
      </header>
    </div>
  );
}

export default withAuthenticator(App);
