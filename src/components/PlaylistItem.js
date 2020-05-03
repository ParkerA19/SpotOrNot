import React from "react";
import "../css/Player.css";
import "../css/App.css";
import collab from "../static/collab.svg";
import TextTruncate from 'react-text-truncate';
import { Link } from 'react-router-dom';

const PlaylistItem = props => {

  // const collabText = props.collaborative ? 'Collaborative' : null;
  const playlist = props.playlist

  const imageAmount = props.playlist.images.length;
  console.log('image array length:', imageAmount)

  const ownerText = 'By ' + playlist.owner.display_name

  const dk = <img style={styles.image} src={require('../static/dk.png')} />

  return (
    <Link to={'Playlists/' + playlist.id} style={styles.playlistLink}>
      <div style={styles.playlist}>
        {playlist.images && playlist.images[0] ? <img style={styles.image} src={playlist.images[0].url} /> : dk}
        <div style={styles.info}>
          <div style={styles.nameContainer}>
            <div style={styles.name}>
              <TextTruncate line={1} truncateText="..." text={playlist.name} />
            </div>
            <div style={styles.owner}>
              {ownerText}
            </div>
          </div>
          {playlist.collaborative ? <img className="collab" src={collab} alt="logo" /> : null}
        </div>
      </div>
    </Link>
  );
}

const styles = {
  image: {
    // margin: '10px',
    height: '300px',
    width: '300px',
  },
  info: {
    // background: '#696969',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirections: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    paddingTop: '5px',
    paddingBottom: '10px'
  },
  name: {
    // color: '#FFFFFF',
    // color: '#808080',
    color: '#FFFAFA',
    fontSize: '16px',
    // padding: '5px',
    // width: '400px',
  },
  nameContainer: {
    textOverflow: 'ellipses',
    overflow: 'hidden',
    width: '245px',
    display: 'flex',
    // alignItems: 'center',
    padding: '5px',
    color: '#FFFFFF',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  owner: {
    color: '#808080',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  playlist: {
    background: '#000000',
    height: '370px',
    width: '300px',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirections: 'column',
    flexWrap: 'wrap',
    display: 'flex',
    margin: '10px',
  },
  playlistLink: {
    textDecoration: 'none',
  }
}

export default PlaylistItem;
