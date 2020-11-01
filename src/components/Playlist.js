import React from "react";
import * as $ from "jquery";
import "../css/Player.css";
import EditTracks from './EditTracks';
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
      editMode: false,
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
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
      },
      success: data => {
        // console.log(data)
        const newItems = this.state.tracks.concat(data.items)
        this.setState({
          tracks: newItems,
        })
        // This allows you to get all the tracks in the playlist
        if (data.next) {
          this.getTracks(token, data.next)
        }
      }
    })
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
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

    const editButtonText = this.state.editMode ? 'Done Editing' : 'Edit Playlist';

    const header =
      <div style={styles.top}>
        {imagesrc ? <img style={styles.image} src={imagesrc} /> : <img styles={styles.image} src={require('../static/dk.png')} />}
        <div style={styles.info}>
          {playlist.name}
          <button style={styles.editButton} onClick={this.toggleEditMode}>{editButtonText}</button>
        </div>
      </div>;
    // console.log('playlist uri:', playlist.uri)

    // console.log(this.state.tracks)

    const body = this.state.editMode ?
      <EditTracks
        tracks={this.state.tracks}
        deviceId={this.state.deviceId}
        collaborative={playlist.collaborative}
        contextUri={playlist.uri}
        token={this.props.token}
      /> :
      <Tracks
        tracks={this.state.tracks}
        deviceId={this.state.deviceId}
        collaborative={playlist.collaborative}
        contextUri={playlist.uri}
        token={this.props.token}
      />;

    const player = (
      <div style={styles.player}>
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
      </div >
    );
    return (
      <div style={styles.layout}>
        {header}
        {body}
        {player}
      </div>
    );
  }
}

const styles = {
  calendarLogo: {
    height: '20px',
    width: '20px',
  },
  editButton: {
    fontSize: 30,
    backgroundColor: 'red',
    marginTop: 10,
    position: 'relative',
    top: 230,
  },
  image: {
    height: '300px',
    width: '300px',
    padding: '12px',
  },
  info: {
    color: '#FFFAFA',
    padding: '12px',
    flexDirection: 'column',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  layout: {
    background: '#212121',
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
