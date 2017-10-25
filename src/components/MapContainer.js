import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Grid } from 'semantic-ui-react';
import UserMarker from './UserMarker'
import MapComponent from './MapComponent';

export default class MapContainer extends Component{

  state={
    filter: "Nearest Charging Station"
  }

  handleChange = (e, { value, text })=>{
    this.setState({
      filter: value
    })

  }

  render(){

    const wifiOptions =[
      {
        text: 'Nearest Charging Station',
        key: 'chargingStation',
        value: 'Nearest Charging Station'
      },
      {
        text: 'Closest WiFi Hotspot',
        key: 'closestWiFi',
        value: 'Closest WiFi Hotspot'
      },
      {
        text: 'All Hotspots within 1000 feet',
        key: 'radius',
        value: 'All Hotspots within 1000 feet'
      }
    ]

    return(
      <div style={{height: '65vh' , width: '85vw', margin: 'auto'}}>
        <Grid verticalAlign="bottom">
          <Grid.Row style={{marginBottom: 15}}>

              <Button as={Link} to='/data'>Go to WiFi Stats</Button>
              <span>
                Showing
                {' '}
                <Dropdown inline
                  text={this.state.filter}
                  options={wifiOptions}
                  value={wifiOptions[0].value}
                  onChange = {this.handleChange}
                />
              </span>
              <span>Current Location</span><span style={{position: "relative", right: -5, top: 4}}><UserMarker /></span>

          </Grid.Row>
        </Grid>
        <MapComponent apiKey={this.props.apiKey} filter={this.state.filter}/>
      </div>
    )
  }

}
