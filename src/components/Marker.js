import React from 'react';

const Marker = ()=>{

    const markerStyle = {
      position: 'fixed',
      borderRadius: '50%',
      border: '2px solid red',
      background: 'white',
      width: 10,
      height: 10,
      zIndex: 0,
    }

    return <div style={markerStyle}></div>;
  }


export default Marker
