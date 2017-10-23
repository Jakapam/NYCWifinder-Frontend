import React from 'react'

const UserMarker = () => {

const userMarkerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  borderRadius: '50%',
  border: '2px solid blue',
  background: 'white',
  width: 10,
  height: 10,
  zIndex: 1
}
  return <div style={userMarkerStyle}></div>;
}

export default UserMarker
