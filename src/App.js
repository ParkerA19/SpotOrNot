import React, {Component} from 'react';
import * as $ from "jquery";
import { BrowserRouter  as Router, Link, Route} from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes, baseUri } from "./config";
import hash from './hash';
import './css/App.css';

import Home from './components/Home'
import Navigation from "./components/Navigation";
import Playlists from './components/Playlists'
import Player from './components/Player'
// const auth = require('./authorization_code/auth');
// var auth = require('./authorization_code/auth');
// var express = require('express'); // Express web server framework

var client_id = '***REMOVED***'; // Your client id
var client_secret = '***REMOVED***'; // Your secret

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token') || null,
      // token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      },() => {
        localStorage.setItem('token', this.state.token)
      });
      // this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
    console.log('you just finished getCurrentlyPlaying')
  }

  render() {
    const welcomePaths = ['', '/', '/callback', '/auth/callback', '/Home'];

    return (
      <Router>
        <Navigation> 
          <div>
            <Route exact={true} path={welcomePaths} render={() => (
              <Home token={this.state.token} />
            )}/>
            <Route path='/Player' render={() => (
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
                token={this.state.token}
              />
            )}/>
            <Route path='/Playlists' render={() => (
              <Playlists
                token={this.state.token}
              />
            )}/>
          </div>
        </Navigation>
      </Router>
    );
  }
}

export default App;
