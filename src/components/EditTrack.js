import React from "react";
import * as $ from "jquery";
import "../css/Player.css";

// type Props =  {
//   collaborative: bool,
//   index: int,
//   contextUri: index
//   addedAt: string,
//   addedBy: {
//       externalUrls: {
//           spotify: string,
//       },
//       href: string,
//       id: string,
//       type: string,
//       uri: string,
//   },
//   isLocal: bool,
//   primaryColor: null,
//   track: [], // hella stuff
//   videoThumbnail: {
//       url: string,
//   },
// }

class EditTrack extends React.Component {
  constructor(props) {
    super(props);
    this.playTrack = this.playTrack.bind(this);

    this.state = {
      keep: true,
    };
  }

  componentDidMount() {
    console.log('component did mount');
  }

  playTrack() {
    console.log('playTrack start');
    console.log('playTrack index:', this.props.index);
    var body = JSON.stringify({ context_uri: this.props.contextUri, offset: { position: this.props.index } })

    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/play?device_id=' + this.props.deviceId,
      type: 'PUT',
      data: body,
      dataType: 'json',
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.token);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
      },
      success: data => {
        // console.log(data)
      }
    })
  }

  render() {
    const t = this.props.track    // First track
    const track = t.track;        // Second track 
    // console.log(track)
    // console.log(track.album)
    const trackname = track.name;
    const addedAt = t.added_at.substring(0, 10);
    const imagesrc = track.album.images ? track.album.images[0].url : require('../static/dk.png');

    const anames = track.artists.map((a, index) => {
      return a.name;
    });
    const artistnames = anames.join(', ');


    return (
      <div>
        <div style={styles.layout}>
          <div style={styles.imageLayout} onClick={this.playTrack}>
            <img style={styles.image} src={imagesrc} />
          </div>
          <div style={styles.trackname} onClick={this.props.toggleKeep}>
            {trackname}
            {/* <LinesEllipsis text={trackname} basedOn='letters'/> */}
          </div>
          <div style={styles.artistnames}>
            {artistnames}
            {/* <LinesEllipsis text={artistnames}/> */}
          </div>
          {/* <div style={styles.addedAt}>
            {addedAt}
          </div> */}
        </div>
      </div>
    );
  }
}

const styles = {
  layout: {
    background: '#212121',
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // padding: '3px',
    // height: '60px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  imageLayout: {
    width: '5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '40px',
    width: '40px',
    marginTop: '2px',
    marginBottom: '2px',
  },
  trackname: {
    width: '38vw',
    color: '#ecebe8',
    // background: '#000',
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    // marginRight: '2vw',
  },
  artistnames: {
    width: '16vw',
    color: '#ecebe8',
    alignItems: 'center',
    // background: '#0000ff',
    display: 'flex',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    // paddingRight: '5px',
    // marginRight: '2vw',
  },
  addedAt: {
    width: '4vw',
    color: '#ecebe8',
    display: 'flex',
    alignItems: 'center',
  },
}

export default EditTrack;
