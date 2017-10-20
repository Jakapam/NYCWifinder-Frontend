import React, { Component } from 'react'

const UserMarker = ({ text, fontSize, color, zIndex, handleHover }) => {

const userMarkerStyle = {
  position: 'fixed',
  borderRadius: '50%',
  border: '2px solid blue',
  background: 'white',
  width: 10,
  height: 10,
  zIndex: 1,
}
  return <div style={userMarkerStyle}></div>;
}

export default UserMarker
