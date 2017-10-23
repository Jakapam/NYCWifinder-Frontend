import React, { Component } from 'react';
import InfoBox from './InfoBox'
import Marker from './Marker'
import UserMarker from './UserMarker'
import GoogleMap from 'google-map-react';

export default class MapComponent extends Component {

  state={
    userMarkerToggle: false,
    userMarkerLat: 40.7829,
    userMarkerLng: -73.9654,
    displayInfoBox: false,
    infoBoxLat: 40.7829,
    infoBoxLng: -73.9654,
    center: {lat: 40.7829, lng: -73.9654},
    zoom: 11,
    infoBoxInfo: null,
    hotspotData: []
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.setBrowserCoordinates)
    fetch('http://192.168.2.145:3000/hotspots')
      .then(res=> res.json())
      .then(json=> this.setState({
        hotspotData: json
      }))
  }

  setBrowserCoordinates = (position)=>{
    this.setState({
      userMarkerLat: position.coords.latitude,
      userMarkerLng: position.coords.longitude,
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 15
    })
  }

  childMouseEnter = (num, childProps)=>{

    this.setState({
      displayInfoBox: true,
      infoBoxLat: childProps.lat,
      infoBoxLng: childProps.lng,
      infoBoxInfo: childProps.hotspotData
    })
  }

  childMouseLeave = ()=>{
    this.setState({
      displayInfoBox: false
    })
  }

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
      userMarkerLng: childProps.lng,

    })
  }

  render() {

    const filteredMarkerList = this.state.hotspotData.filter((hotspot)=>
      {
        return Math.sqrt(Math.pow(this.state.userMarkerLat - hotspot.latitude, 2)+Math.pow(this.state.userMarkerLng - hotspot.longitude, 2)) < .01
      }
    )


    const markerList = filteredMarkerList.map((hotspot, index)=>
    <Marker
      key={index}
      lat={hotspot.latitude}
      lng={hotspot.longitude}
      hotspotData = {hotspot}
    />
    )

    return (
      <GoogleMap
        onChildMouseEnter={this.childMouseEnter}
        onChildMouseLeave={this.childMouseLeave}
        onChildClick={this.childClickWorkaround}
        onClick={this.handleClick}
        center={this.state.center}
        margin={[30,30,30,30]}
        zoom={this.state.zoom}
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

        {this.state.displayInfoBox ? <InfoBox
          lat={this.state.infoBoxLat}
          lng={this.state.infoBoxLng}
          hotspotData= {this.state.infoBoxInfo}
        /> : null}

      </GoogleMap>
    );
  }
}
