import React from "react";
import * as $ from "jquery";
import "../css/Player.css";
// import play from "../../node_modules/react-spotify-web-playback/lib/spotify"
// import LinesEllipsis from 'react-lines-ellipsis'
// import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

// const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

// const propsType =  {
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

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //   track: null
    addedBy: null,    // user who added the track
      // addedBy: {    // user who added the track
      //   displayName: '',
      //   href: '',
      //   id: '',
      // },   
    };
  }

  componentDidMount() {
    // console.log('props token:', this.props.token)
    // console.log('collab:', this.props.collaborative)
    // console.log('track:', this.props.track)
    this.playTrack = this.playTrack.bind(this)
    if (this.props.token && this.props.collaborative && this.props.track.added_by) {
      this.getAddedBy = this.getAddedBy.bind(this)
      this.getAddedBy(this.props.token, this.props.track.added_by.href)
    }
    else {
      if (this.props.collaborative) {
        console.log('No token or added_by user. Could not get user')
      }
    }
  }

  getAddedBy(token, url) {
    console.log('getting addedby user')
    $.ajax({
      url: url,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          addedBy: data,
          // addedBy: {
          //   displayName: data.display_name,
          //   href: data.href,
          //   id: data.id,
          // },
        })
      }
    })
  }

  playTrack() {
    // console.log('play track from tracks!')
    var body = JSON.stringify({ context_uri: this.props.contextUri, offset: {position: this.props.index}})

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

    // fetch("https://api.spotify.com/v1/me/player/play?device_id=" + this.props.deviceId, {
    //   body: body,
    //   headers: {
    //     Authorization: "Bearer " + this.props.token,
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'PUT',
    // })
    // .then(res => res.json())
    // .then(result => console.log(result))
  }

  render() {
    const t = this.props.track    // First track
    const track = t.track;        // Second track 
    // console.log(track)
    // console.log(track.album)
    const trackname = track.name;
    const addedBy = this.state.addedBy ? this.state.addedBy.display_name : null
    const addedAt = t.added_at.substring(0, 10);
    const imagesrc = track.album.images ? track.album.images[0].url : require('../static/dk.png');

    const anames = track.artists.map((a, index) => {
      return a.name;
    });
    const artistnames = anames.join(', ');


    return (
      <div>
        <div style={styles.layout}>
          <div style={styles.imageLayout}>
            <img style={styles.image} src={imagesrc}/>
          </div>
          <div style={styles.trackname} onClick={this.playTrack}>
              {trackname}
              {/* <LinesEllipsis text={trackname} basedOn='letters'/> */}
          </div>
          <div style={styles.artistnames}>
              {artistnames}
              {/* <LinesEllipsis text={artistnames}/> */}
          </div>
          <div style={styles.addedBy}>
              {addedBy}
          </div>
          <div style={styles.addedAt}>
            {addedAt}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  layout: {
    background: '#383838',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginRight: '2vw',
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
    marginRight: '2vw',
  },
  addedBy: {
    width: '16vw',
    color: '#ecebe8',
    // background: '#ff0000',
    display: 'flex',
    alignItems: 'center',
    marginRight: '2vw',
  },
  addedAt:{
    width: '4vw',
    color: '#ecebe8',
    display: 'flex',
    alignItems: 'center',
  },
}

export default Track;
