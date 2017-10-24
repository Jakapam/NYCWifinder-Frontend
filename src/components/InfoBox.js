import React from 'react'

const InfoBox = (props)=>{
  const infoStyle = {
    zIndex: 10,
    position: 'absolute',
    borderRadius: '15%',
    border: '2px solid red',
    background: 'white',
    minWidth: 250,
    padding: 20,
    margin: 5,
    fontSize: 16
  }

  let displayDiv = <div></div>

  if (props.hotspotData){
   displayDiv = (
     <div style={infoStyle}>
       <p>Location: {props.hotspotData.closest_address}</p>
       <p>SSID: {props.hotspotData.network_name}</p>
       <p>Provider: {props.hotspotData.service_provider}</p>
       <p>Services: {props.hotspotData.service_options}</p>
       <p>Type: {props.hotspotData.service_type}</p>
     </div>
   )
  }


  return(
    displayDiv
  )


}

export default InfoBox
