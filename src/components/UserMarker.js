import React from 'react'

const UserMarker = () => {

const userMarkerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  borderRadius: '50%',
  border: '1px solid black',
  background: 'blue',
  width: 12,
  height: 12,
  zIndex: 1
}
  return <div style={userMarkerStyle}></div>;
}

export default UserMarker
