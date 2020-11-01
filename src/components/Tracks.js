import React from "react";
import "../css/Player.css";
import calendar from "../static/calendar.svg";
import Track from './Track'
// Props: {
//   token: string,
//   collaborative: bool
//   tracks: []
// }

class Playlists extends React.Component {
  render() {
    console.log('render those tracks');
    const labels = (
      <div>
        <div style={styles.labels}>
          <div style={styles.labelsTitle}>
            Title
          </div>
          <div style={styles.labelsArtist}>
            Artist
          </div>
          {this.props.collaborative ? (
            <div style={styles.labelsUser}>
              User
            </div>) : null}
          <div style={styles.labelsCalendar}>
            <img style={styles.calendarLogo} src={calendar} />
          </div>
        </div>
        <div style={styles.underline}></div>
      </div>
    );

    const tracks = this.props.tracks.map((t, index) => {
      // console.log(this.state.tracks)
      // console.log(t.track.name)
      // console.log('playlist:', playlist)
      return (
        <div key={t.track.id}>
          <Track
            track={t}
            index={index}
            token={this.props.token}
            deviceId={this.props.deviceId}
            contextUri={this.props.contextUri}
            collaborative={this.props.collaborative}
          />
          <div style={styles.underline}></div>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        {labels}
        {tracks}
      </div>
    );
  }
}

const styles = {
  calendarLogo: {
    height: '20px',
    width: '20px',
  },
  container: {
    marginBottom: '50px',
  },
  labels: {
    background: '#212121',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  labelsArtist: {
    color: '#ecebe8',
    width: '18vw',
  },
  labelsCalendar: {
    color: '#ecebe8',
  },
  labelsTitle: {
    marginLeft: '5vw',
    width: '40vw',
    color: '#ecebe8',
  },
  labelsUser: {
    color: '#ecebe8',
    width: '18vw',
  },
  underline: {
    background: '#828282',
    height: '1px',
    width: '90vw',
  },
}

export default Playlists;
