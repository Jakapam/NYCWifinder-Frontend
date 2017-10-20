import React, { Component } from 'react';
import Marker from './Marker'
import UserMarker from './UserMarker'
import GoogleMap from 'google-map-react';

export default class MapComponent extends Component {
  state={
    userMarkerToggle: false,
    userMarkerLat: 40.7829,
    userMarkerLng: -73.9654
  }
  static defaultProps = {
    center: {lat: 40.7829, lng: -73.9654},
    zoom: 11,
  };

  handleClick = (obj)=>{
    console.log(obj)
    this.setState({
      userMarkerToggle: !this.state.userMarkerToggle,
      userMarkerLat: obj.lat,
      userMarkerLng: obj.lng
    })
  }

  childClickWorkaround = (number, childProps) =>{
    this.setState({
      userMarkerLat: childProps.lat,
      userMarkerLng: childProps.lng
    })
  }

  render() {

    const filteredMarkerList = this.props.hotspots.data.filter((hotspot)=>
    {
      return Math.sqrt(Math.pow(this.state.userMarkerLat - hotspot[15], 2)+Math.pow(this.state.userMarkerLng - hotspot[16], 2)) < .01
      }
    )


    const markerList = filteredMarkerList.map((hotspot, index)=>
    <Marker
      key={index}
      lat={hotspot[15]}
      lng={hotspot[16]}
      hotspotData = {hotspot}
    />
    )

    return (
      <GoogleMap
        onChildClick={this.childClickWorkaround}
        onClick= {this.handleClick}
        defaultCenter={this.props.center}
        margin={[30,30,30,30]}
        defaultZoom={this.props.zoom}
        bootstrapURLKeys={{
          key: this.props.apiKey,
          language: 'en',
          }}
      >

        <UserMarker
          lat={this.state.userMarkerLat}
          lng={this.state.userMarkerLng}
        />

        {markerList}

      </GoogleMap>
    );
  }
}
