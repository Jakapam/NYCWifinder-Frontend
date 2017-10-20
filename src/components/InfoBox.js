import React, { Component } from 'react'

const InfoBox = (props)=>{
  const infoStyle = {
    zIndex: 10,
    position: 'fixed',
    borderRadius: '15%',
    border: '2px solid red',
    background: 'white',
    padding: 10,
    margin: 5,
    fontSize: 16,
    width: 150,
    height: 300,
  }
  return <div style={infoStyle}>{'PLACEHOLDER FOR HOTSPOT DATA'}</div>
}

export default InfoBox
