import React, { Component } from 'react';
import InfoBox from './InfoBox'
import haversineDistance from '../haversine.js'
import Marker from './Marker'
import UserMarker from './UserMarker'
import GoogleMap from 'google-map-react';

export default class MapComponent extends Component {

  state={
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
    this.setState({
      userMarkerLat: obj.lat,
      userMarkerLng: obj.lng,
      center: {lat: obj.lat, lng: obj.lng}
    })
  }

  childClickWorkaround = (number, childProps) =>{
    this.setState({
      userMarkerLat: childProps.lat,
      userMarkerLng: childProps.lng,

    })
  }

  render() {

    let markerDisplay
    let dynamicCenter

    if(this.props.filter==="All Hotspots within 1000 feet"){
      markerDisplay = this.state.hotspotData.filter((hotspot)=>
      {
        return haversineDistance([this.state.userMarkerLng ,this.state.userMarkerLat],[hotspot.longitude,hotspot.latitude]) < 0.3048
      })
      dynamicCenter = {lat: this.state.userMarkerLat, lng: this.state.userMarkerLng}

    }else if (this.props.filter==="Closest WiFi Hotspot"){
      markerDisplay = this.state.hotspotData.reduce((p, v)=> {

        let pDistance = haversineDistance([this.state.userMarkerLng ,this.state.userMarkerLat],[p.longitude,p.latitude])
        let vDistance = haversineDistance([this.state.userMarkerLng ,this.state.userMarkerLat],[v.longitude,v.latitude])

        return ( pDistance < vDistance ? p : v );
      })

      dynamicCenter = {lat: ((this.state.userMarkerLat + markerDisplay.latitude)/2), lng: ((this.state.userMarkerLng + markerDisplay.longitude)/2)}

    } else {

      if(this.state.hotspotData.length > 0){
        let chargingStations = this.state.hotspotData.filter((hotspot)=>
        {
          if( hotspot.service_options !== null ){
            return hotspot.service_options.includes("phone")
          } else {
            return false
          }
        })

        markerDisplay = chargingStations.reduce((p, v)=> {

          let pDistance = haversineDistance([this.state.userMarkerLng ,this.state.userMarkerLat],[p.longitude,p.latitude])
          let vDistance = haversineDistance([this.state.userMarkerLng ,this.state.userMarkerLat],[v.longitude,v.latitude])

          return ( pDistance < vDistance ? p : v );
        })

        dynamicCenter = {lat: ((this.state.userMarkerLat + markerDisplay.latitude)/2), lng: ((this.state.userMarkerLng + markerDisplay.longitude)/2)}

      } else {
        markerDisplay = []
      }

    }

    const markerList = Array.isArray(markerDisplay) ? markerDisplay.map((hotspot, index)=>{
      return <Marker
        key={index}
        lat={hotspot.latitude}
        lng={hotspot.longitude}
        hotspotData = {hotspot}
      />
    })
    :
    <Marker
      lat={markerDisplay.latitude}
      lng={markerDisplay.longitude}
      hotspotData = {markerDisplay}
    />

    return (
      <GoogleMap
        onChildMouseEnter={this.childMouseEnter}
        onChildMouseLeave={this.childMouseLeave}
        onChildClick={this.childClickWorkaround}
        onClick={this.handleClick}
        center={dynamicCenter || this.state.center}
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
