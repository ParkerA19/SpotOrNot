import React from "react";
import "../css/Player.css";
import calendar from "../static/calendar.svg";
import EditTrack from './EditTrack'
// Props: {
//   token: string,
//   collaborative: bool
//   tracks: []
// }

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keep: props.tracks,
      remove: [],
      keepIndices: [],
    };
  }

  toggleKeep(index, shouldKeep) {
    // console.log('index:', index, shouldKeep);
    if (shouldKeep) { // moving from remove to keep
      const remove = this.state.remove;
      const newKeep = remove.splice(index, 1);
      const keep = this.state.keep;


      const keepIndex = this.state.keepIndices[index]
      keep.splice(keepIndex, 0, newKeep[0]);
      const newKeepIndices = this.state.keepIndices;
      newKeepIndices.splice(index, 1);
      const finalKeepIndices = newKeepIndices.map((val, i) => {
        console.log('val:', val, 'i:', i, 'keepIndex:', keepIndex);
        if (val > keepIndex && i >= index) {
          return val + 1
        }
        return val
      });
      console.log(finalKeepIndices);
      this.setState({
        // keep: this.state.keep,
        remove: remove,
        keepIndices: finalKeepIndices,
      });
    } else { // moving from keep to remove
      const keep = this.state.keep;
      const newRemove = keep.splice(index, 1);
      const remove = this.state.remove.concat(newRemove);
      const newIndex = [index];
      const keepIndices = this.state.keepIndices.concat(newIndex);
      this.setState({
        keep: keep,
        remove: remove,
        keepIndices: keepIndices,
      });
    }
  }

  render() {
    const labels = (
      <div>
        <div style={styles.labels}>
          <div style={styles.labelsTitle}>
            Title
          </div>
          <div style={styles.labelsArtist}>
            Artist
          </div>
          <div style={styles.labelsCalendar}>
            <img style={styles.calendarLogo} src={calendar} />
          </div>
        </div>
        <div style={styles.underline}></div>
      </div>
    );

    const keepTracks = this.state.keep.map((t, index) => {
      // console.log(this.state.tracks)
      // console.log(t.track.name)
      // console.log('playlist:', playlist)
      // console.log('track index:', t.track.name, index);
      // console.log(t);
      return (
        <div key={t.track.id}>
          <EditTrack
            track={t}
            index={index}
            token={this.props.token}
            deviceId={this.props.deviceId}
            contextUri={this.props.contextUri}
            collaborative={this.props.collaborative}
            toggleKeep={() => this.toggleKeep(index, false)}
          />
          <div style={styles.underline}></div>
        </div>
      );
    });

    const removeTracks = this.state.remove.map((t, index) => {
      // console.log(this.state.tracks)
      // console.log(t.track.name)
      // console.log('playlist:', playlist)
      return (
        <div key={t.track.id}>
          <EditTrack
            track={t}
            index={index}
            token={this.props.token}
            deviceId={this.props.deviceId}
            contextUri={this.props.contextUri}
            collaborative={this.props.collaborative}
            toggleKeep={() => this.toggleKeep(index, true)}
          />
          <div style={styles.underline}></div>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        {/* {labels} */}
        <div style={styles.keep}>
          {keepTracks}
        </div>
        <div style={styles.remove}>
          {removeTracks}
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
  container: {
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  keep: {
    backgroundColor: 'pink',
    width: '50%',
  },
  remove: {
    backgroundColor: 'orange',
    width: '50%',
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
