import React from 'react';

const Marker = ()=>{

    const markerStyle = {
      position: 'fixed',
      borderRadius: '50%',
      border: '1px solid black',
      background: 'red',
      width: 12,
      height: 12,
      zIndex: 0,
    }

    return <div style={markerStyle}></div>;
  }


export default Marker
