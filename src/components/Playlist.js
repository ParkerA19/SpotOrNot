import React from "react";
import * as $ from "jquery";
import PlaylistItem from './PlaylistItem'
import "../css/Player.css";
import { render } from "@testing-library/react";
import Navigation from "./Navigation";
import SpotifyPlayer from 'react-spotify-web-playback';

// Props: {
//   token: string,
//   playlist: []
// }

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    if (this.props.token && this.props.playlist.tracks) {
      this.getTracks = this.getTracks.bind(this)
      this.getTracks(this.props.token, this.props.playlist.tracks.href)
    }
    else {
      console.log('No token or tracks. Could not get playlists')
    }
  }

  getTracks(token, url) {
    console.log('getting tracks')
    $.ajax({
      url: url,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          tracks: data.items,
        })
      }
    })
  }

  render() {

    const playlist = this.props.playlist;
    const imagesrc = playlist.images && playlist.images[0].url
    console.log('playlist uri:', playlist.uri)

    console.log(this.state.tracks)
    const trackUris = this.state.tracks.map((t) => {
      return t.track.uri
    })

    const options = {
      context_uri: playlist.uri
    }

    const player = (
      <SpotifyPlayer
        // context_uri={playlist.uri}
        // name={playlist.uri}
        uris={playlist.uri}
        // uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
        // options={options}
        play={false}
        showSaveIcon={true}
        token={this.props.token}
        // uris={trackUris}
      />
   );
    return (
      <div style={styles.layout}>
        <div style={styles.top}>
          {imagesrc ? <img style={styles.image} src={imagesrc}/> : <img styles={styles.image} src={require('../static/dk.png')}/>}
          <div style={styles.info}>
            {playlist.name}
          </div>
        </div>
        {player}
      </div>
    );
  }
}

const styles = {
  image: {
    height: '300px',
    width: '300px',
  },
  info: {
    color: '#FFFAFA',
    padding: '10px',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  layout: {
    background: '#383838',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  player: {
    bgColor: '#333',
    color: '#fff',
    loaderColor: '#fff',
    sliderColor: '#1cb954',
    savedColor: '#fff',
    trackArtistColor: '#ccc',
    trackNameColor: '#fff',
  },
  top: {
    display: 'flex',
  },
}

export default Playlists;
