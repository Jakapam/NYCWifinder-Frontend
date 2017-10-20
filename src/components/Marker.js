import React, { Component } from 'react';
import InfoBox from './InfoBox'

export default class Marker extends Component{

  state= {
    displayInfoBox: false
  }

  handleMouseEnter = ()=>{
    this.setState({
      displayInfoBox: true
    })
  }

  handleMouseLeave = ()=>{
    this.setState({
      displayInfoBox: false
    })
  }

  render(){

    const markerStyle = {
      position: 'fixed',
      borderRadius: '50%',
      border: '2px solid red',
      background: 'white',
      width: 10,
      height: 10,
      zIndex: 0,
    }

    return <div
      style={markerStyle}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      >
      {this.state.displayInfoBox ? <InfoBox hotspotData= {this.props.hotspotData}/> : null}
    </div>;
  }
}
