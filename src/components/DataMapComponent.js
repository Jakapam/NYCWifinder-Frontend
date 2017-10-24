import React, { Component } from 'react'
import GoogleMap from 'google-map-react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';
import Marker from './Marker'

export default class DataMapContainer extends Component{

  state={
    center: {lat: 40.7829, lng: -73.9654},
    zoom: 11,
    filterOption: "all",
    filterQuery: null,
    hotspotData: []
  }

  componentDidMount(){
    fetch('http://192.168.2.145:3000/hotspots')
      .then(res=> res.json())
      .then(json=> this.setState({
        hotspotData: json
      }))
  }

  handleChange = (e, {value})=>{

    this.setState({
      filterOption: value
    })

  }

  handleQueryChange= (e, {value})=>{
    this.setState({
      filterQuery: value
    })
  }

  handleSubmit = ()=>{

    if(this.state.filterOption === 'all'){
      fetch('http://192.168.2.145:3000/hotspots')
        .then(res=> res.json())
        .then(json=> this.setState({
          hotspotData: json
        }))
    } else {
      fetch(`http://192.168.2.145:3000/${this.state.filterOption}/${this.state.filterQuery}`)
      .then(res=> res.json())
      .then(json=> this.setState({
        hotspotData: json
      }))
    }


    if(this.state.filterOption === 'zipcodes'){
      this.setState({
        zoom: 15
      })
    } else {
      this.setState({
        zoom: 11
      })
    }

  }

  render(){

    let dynamicCenter = {lat: 0, lng: 0}

    const markerList = this.state.hotspotData.map((hotspot, index)=>{

      dynamicCenter.lat += hotspot.latitude;
      dynamicCenter.lng += hotspot.longitude;

      return <Marker
        key={index}
        lat={hotspot.latitude}
        lng={hotspot.longitude}
      />
    })

    dynamicCenter.lat = dynamicCenter.lat/(markerList.length || 1)
    dynamicCenter.lng = dynamicCenter.lng/(markerList.length || 1)

    const options =[
      {
        text: 'Boroughs',
        key: 'boroughs',
        value: 'boroughs'
      },
      {
        text: 'Zipcode',
        key: 'zipcodes',
        value: 'zipcodes'
      },
      {
        text: 'All',
        key: 'all',
        value: 'all'
      }
    ]

    const boroughOptions=[
      {
        text: 'Manhattan',
        key: 'Manhattan',
        value: 'Manhattan'
      },{
        text: 'Queens',
        key: 'Queens',
        value: 'Queens'
      },{
        text: 'Brooklyn',
        key: 'Brooklyn',
        value: 'Brooklyn'
      },{
        text: 'Bronx',
        key: 'Bronx',
        value: 'Bronx'
      },{
        text: 'Staten Island',
        key: 'Staten%20Island',
        value: 'Staten%20Island'
      }
    ]

    let inputDisplay

    if (this.state.filterOption === 'boroughs'){
      inputDisplay= <Form.Select options={boroughOptions} defaultValue={options[2].value} onChange={this.handleQueryChange}/>
    } else if(this.state.filterOption === 'zipcodes'){
      inputDisplay= <Form.Input placeholder="Enter Zipcode" type='number' onChange={this.handleQueryChange}/>
    }


    return (

      <div style={{height: '65vh' , width: '85vw', margin: 'auto'}}>
        <Grid>
          <Grid.Row>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group inline>
                <Button size='medium' as={Link} to='/'>WiFinder</Button>
                <Form.Select options={options} defaultValue={options[2].value} onChange= {this.handleChange} />
                { inputDisplay }
                <Form.Button>Show Hotspots</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Row>
        </Grid>
        <GoogleMap
          center={dynamicCenter.lat === 0 ? this.state.center : dynamicCenter}
          zoom={this.state.zoom}
          bootstrapURLKeys={{
            key: this.props.apiKey,
            language: 'en',
          }}
          >
            {markerList}
          </GoogleMap>
      </div>
      )
  }

}
