import React from "react";
import * as $ from "jquery";
import "../css/Player.css";
import Tracks from './Tracks';
import SpotifyPlayer from 'react-spotify-web-playback';

// Props: {
//   token: string,
//   playlist: []
// }

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      deviceId: '',
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
    // console.log('getting tracks')
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

  updateDeviceId = (deviceId) => {
    this.setState({
      deviceId: deviceId,
    })
  }

  render() {

    // console.log('device id from playlists.js:', this.state.deviceId)

    const playlist = this.props.playlist;
    const imagesrc = playlist.images && playlist.images[0].url
    // console.log('playlist uri:', playlist.uri)

    // console.log(this.state.tracks)

    const player = (
      <SpotifyPlayer
        // context_uri={playlist.uri}
        // name={playlist.uri}
        uris={playlist.uri}
        // uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
        play={false}
        showSaveIcon={true}
        styles={styles.playerStyle}
        token={this.props.token}
        sendDeviceID={this.updateDeviceId}
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
        {/* <div style={styles.tracks}> */}
        <Tracks 
          tracks={this.state.tracks}
          deviceId={this.state.deviceId}
          collaborative={playlist.collaborative}
          contextUri={playlist.uri}
          token={this.props.token}
        />
        {/* </div>/ */}
        <div style={styles.player}>
          {player}
        </div>
      </div>
    );
  }
}

const styles = {
  calendarLogo: {
    height: '20px',
    width: '20px',
  },
  image: {
    height: '300px',
    width: '300px',
    padding: '12px',
  },
  info: {
    color: '#FFFAFA',
    padding: '12px',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  layout: {
    background: '#383838',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  player: {
    position: 'fixed',
    bottom: 0,
    width: '90vw',
  },
  playerStyle: {
    display: 'flex',
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
    // position: 'sticky',
    // top: 0,
    // zIndex: 100,
  },
  tracks: {
    position: 'relative',
    top: 324,
  }
}

export default Playlists;
