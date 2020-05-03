import React from "react";
import * as $ from "jquery";
import PlaylistItem from './PlaylistItem'
import Playlist from './Playlist'
import "../css/Player.css";
import { BrowserRouter  as Router, Link, Route} from 'react-router-dom';


class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // token: localStorage.getItem('token') || null,
      playlistData: {
        playlists: [],
        limit: 0,
        next: "",
        offset: 0,
        previous: null,
        total: 0
      },
      current: null
      // playlists: [{
      //   title: "",
      //   authors: [],
      //   collaborative: false,
      // }]
    };
  }

  componentDidMount() {
    if (this.props.token) {
      this.getPlaylists = this.getPlaylists.bind(this)
      this.getPlaylists(this.props.token)
    }
    else {
      console.log('No token. Could not get playlists')
    }
  }

  getPlaylists(token) {
    console.log('getting playlists')
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists?limit=5",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          playlistData: {
            playlists: data.items,
            limit: data.limit,
            next: data.next,
            offset: data.offset,
            previous: data.previous,
            total: data.total
          }
        })
      }
    })
  }

  render() {
    console.log('render playlist data: ', this.state.playlistData)

    const playlists = this.state.playlistData.playlists.map((p) => {
      console.log(p)
      return <PlaylistItem key={p.id} playlist={p} />
    });

    const playlistPage = this.state.playlistData.playlists.map((p) => {
      // console.log('playlist id: ', p.id)
      const path = "/Playlists/" + p.id
      return (
        <Route key={p.id} path={path} render={() => (
          <Playlist token={this.props.token} playlist={p} />
        )}/>
      );
    })

    return (
      // <Navigation>
      <div>
        <Route exact={true} path="/Playlists" render={() => (
          <div style={styles.layout}>
            {playlists}
          </div>
        )}/>
        {playlistPage}
      </div>
      // </Navigation>
    );
  }
}

const styles = {
  layout: {
    background: '#383838',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}

export default Playlists;
