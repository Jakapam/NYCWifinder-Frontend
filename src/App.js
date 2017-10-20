import React, { Component } from 'react';
import MapComponent from './components/MapComponent'
import logo from './logo.svg';
import { Button, Grid } from 'semantic-ui-react'
import GAPIKEY from './private'
import hotspots from './hotspots'
import './App.css';

class App extends Component {


  render() {

    return (
      <div style={{height: 700, width: 700}}>
        <MapComponent apiKey={GAPIKEY} hotspots= {hotspots}/>
      </div>
    );
  }
}

export default App;
