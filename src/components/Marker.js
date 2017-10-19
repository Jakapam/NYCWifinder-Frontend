import React, { Component } from 'react';

const Marker = ({ text }) => {
const MARKER_SIZE = 40;
const greatPlaceStyle = {
  position: 'absolute',
  fontSize: 35,
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  left: -MARKER_SIZE / 2,
  top: -MARKER_SIZE / 2
}
  return <div style={greatPlaceStyle}>{text}</div>;
}

export default Marker
