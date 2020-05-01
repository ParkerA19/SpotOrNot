import React from "react";
import "../css/Player.css";
import { Link } from 'react-router-dom';

// Props: children
const Navigation = props => {

  return (
    <Root>
      <Sidebar>
        <SidebarItem key={"Home"}>
          <Link to={`/Home`}>
            Home
          </Link>
        </SidebarItem>
        <SidebarItem key={"Player"}>
          <Link to={`/Player`}>
            Player Link
          </Link>
        </SidebarItem>
        <SidebarItem key={"Playlists"}>
          <Link to={`/Playlists`}>
            Playlists
          </Link>
        </SidebarItem>
      </Sidebar>
      <Main>
        {props.children}
      </Main>
    </Root> );
}

const Root = (props) => (
    <div style ={{
      display: 'flex'
    }} {...props} />
  )
  
  const Sidebar = (props) => (
    <div style={{
      width: '10vw',
      height: '100vh',
      overflow: 'auto',
      background:'#eee'
    }} {...props} />
  )
  
  const SidebarItem = (props) => (
    <div style={{
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      padding: '5px 10px'
    }} {...props} />
  )
  
  const Main = (props) => (
    <div style={{
      flex: 1,
      height: '100vh',
      overflow: 'auto'
    }}>
      <div style={{ padding: '0px' }} {...props}/>
    </div>
  )

export default Navigation;
