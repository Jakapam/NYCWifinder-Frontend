import React, { Component } from 'react';
import Marker from './Marker'
import GoogleMap from 'google-map-react';

export default class MapComponent extends Component {
  static defaultProps = {
    center: {lat: 40.7829, lng: -73.9654},
    zoom: 11
  };

  render() {

    const markerList = this.props.hotspots.data.map((hotspot)=>
    <Marker
      lat={hotspot[15]}
      lng={hotspot[16]}
      text={'💩'}
    />
    )

    return (
      <GoogleMap
        defaultCenter={this.props.center}
        margin={[30,30,30,30]}
        defaultZoom={this.props.zoom}
        bootstrapURLKeys={{
          key: this.props.apiKey,
          language: 'en',
          }}
      >

        {markerList}
        
      </GoogleMap>
    );
  }
}
