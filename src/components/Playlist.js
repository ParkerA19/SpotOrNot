import React from "react";
import * as $ from "jquery";
import PlaylistItem from './PlaylistItem'
import "../css/Player.css";
import { render } from "@testing-library/react";
import Navigation from "./Navigation";

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    };
  }

//   componentDidMount() {
//     if (this.props.token) {
//       this.getPlaylists = this.getPlaylists.bind(this)
//       this.getPlaylists(this.props.token)
//     }
//     else {
//       console.log('No token. Could not get playlists')
//     }
//   }

//   getPlaylists(token) {
//     console.log('getting playlists')
//     $.ajax({
//       url: "https://api.spotify.com/v1/me/playlists?limit=50",
//       type: "GET",
//       beforeSend: xhr => {
//         xhr.setRequestHeader("Authorization", "Bearer " + token);
//       },
//       success: data => {
//         this.setState({
//           playlistData: {
//             playlists: data.items,
//             limit: data.limit,
//             next: data.next,
//             offset: data.offset,
//             previous: data.previous,
//             total: data.total
//           }
//         })
//       }
//     })
//   }

  render() {
      
    const playlist = this.props.playlist;
    const imagesrc = playlist.images && playlist.images[0].url
    console.log('imagesrc:', imagesrc)
    return (
      <div style={styles.layout}>
          {imagesrc ? <img src={imagesrc}/> : <img src={require('../static/dk.png')}/>}
          {playlist.name}
      </div>
    );
  }
}

const styles = {
  layout: {
    background: '#383838',
    display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  }
}

export default Playlists;
