import React from "react";
import "../css/Player.css";
import calendar from "../static/calendar.svg";
import EditTrack from './EditTrack'
// Props: {
//   token: string,
//   collaborative: bool
//   tracks: []
// }

class EditTracks extends React.Component {
  constructor(props) {
    super(props);

    const trackState = props.tracks.map((t, i) => {
      return {
        track: t,
        index: i,
      };
    })

    this.state = {
      keep: trackState,
      remove: [],
    };
  }

  // toggleKeep(index, shouldKeep) {
  //   // console.log('index:', index, shouldKeep);
  //   if (shouldKeep) { // moving from remove to keep
  //     const remove = this.state.remove;
  //     const newKeep = remove.splice(index, 1);
  //     const keep = this.state.keep;


  //     const keepIndex = this.state.keepIndices[index]
  //     keep.splice(keepIndex, 0, newKeep[0]);
  //     const newKeepIndices = this.state.keepIndices;
  //     newKeepIndices.splice(index, 1);
  //     const finalKeepIndices = newKeepIndices.map((val, i) => {
  //       console.log('val:', val, 'i:', i, 'keepIndex:', keepIndex);
  //       if (val > keepIndex) {
  //         return val + 1
  //       } else if (val == keepIndex && i < index) {
  //         return val + 1
  //       }
  //       return val
  //     });
  //     console.log(finalKeepIndices);
  //     this.setState({
  //       // keep: this.state.keep,
  //       remove: remove,
  //       keepIndices: finalKeepIndices,
  //     });
  //   } else { // moving from keep to remove
  //     const keep = this.state.keep;
  //     const newRemove = keep.splice(index, 1);
  //     const remove = this.state.remove.concat(newRemove);
  //     const newIndex = [index];
  //     const keepIndices = this.state.keepIndices.concat(newIndex);
  //     const finalKeepIndices = keepIndices.map((val, i) => {
  //       console.log('val:', val, 'i:', i, 'index:', index);
  //       if (val > index) {
  //         return val - 1
  //       }
  //       return val
  //     });
  //     this.setState({
  //       keep: keep,
  //       remove: remove,
  //       keepIndices: finalKeepIndices,
  //     });
  //   }
  // }

  findSortIndex(sortVal, keep) {
    var trackList;
    if (keep) {
      // console.log('remove -> keep')
      trackList = this.state.keep;
    } else {
      // console.log('keep -> remove')
      trackList = this.state.remove;
    }

    const maxIndex = trackList.length - 1;
    var length = trackList.length;
    // console.log('length:', length);

    if (length == 0) {
      return 0;
    }

    var i = Math.floor(length / 2);
    // console.log('i:', i);
    var offset = 0;

    var checkIndex;
    var halfLength;

    while (true) {
      // console.log('offset:', offset);
      i += offset;
      // console.log('i in loop:', i);
      if (length == 0) {
        return i;
      }
      halfLength = Math.floor(length / 2);
      checkIndex = trackList[i].index;
      // console.log('length in loop:', length);
      if (sortVal > checkIndex) {
        // console.log('greater than')
        if (length == 1) {
          // console.log('length is 1');
          return i + 1;
        }
        if (length % 2 == 0) {
          // console.log('even length');
          length = halfLength - 1;  // set the new length
          offset = Math.floor(length / 2) + 1;  // Calculate the offset
        } else {
          // console.log('odd length');
          length = halfLength;
          offset = Math.floor(length / 2) + 1;
        }
      } else if (sortVal < checkIndex) {
        // console.log('less than');
        if (length == 1) {
          // console.log('length is 1')
          return i;
        }
        length = halfLength;
        if (length % 2 == 0) {
          // console.log('even length');
          // length = halfLength;  // set the new length
          offset = -Math.floor(length / 2);  // Calculate the offset
        } else {
          // console.log('odd length');
          // length = halfLength;
          offset = -(Math.floor(length / 2) + 1);
        }
      }
    }
  }

  toggleKeep(index, shouldKeep) {
    // console.log('index:', index, shouldKeep);
    if (shouldKeep) { // moving from remove to keep
      const remove = this.state.remove;
      const newKeep = remove.splice(index, 1);

      const sortIndex = this.findSortIndex(newKeep[0].index, true)
      // console.log('sortIndex:', sortIndex);
      const keep = this.state.keep
      keep.splice(sortIndex, 0, newKeep[0]);

      this.setState({
        keep: keep,
        remove: remove,
      });
    } else { // moving from keep to remove
      const keep = this.state.keep;
      const newRemove = keep.splice(index, 1);

      const sortIndex = this.findSortIndex(newRemove[0].index, false)
      // console.log('sortIndex:', sortIndex);
      const remove = this.state.remove
      remove.splice(sortIndex, 0, newRemove[0]);

      this.setState({
        keep: keep,
        remove: remove,
      });
    }
  }

  render() {
    // console.log('state:', this.state);
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
            track={t.track}
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
            track={t.track}
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

export default EditTracks;
