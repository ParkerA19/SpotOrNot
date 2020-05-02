import React from "react";
import "../css/Player.css";
import Navigation from "./Navigation";
import { authEndpoint, clientId, redirectUri, scopes, baseUri } from "../config";
import logo from '../static/logo.svg';

// Props: token
const Home = props => {

  const loginpage = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://github.com/ParkerA19/SpotOrNot"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Repository
        </a>
        <a
          className="login-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Login to Spotify
        </a>
      </header>
    </div> );

  const homepage = (
    <div className = "App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          You are logged in! Welcome to the home page!
        </p>
        <a
          className="App-link"
          href="https://github.com/ParkerA19/SpotOrNot"
          target="_blank"
          rel="noopener noreferrer"
        >
          git it
        </a>
      </header>
    </div> );

    const page = props.token ? homepage : loginpage;

  return page;
      // <Navigation>
        // {page}
      // </Navigation>
  // );
}

export default Home;
