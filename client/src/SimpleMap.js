import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default function SimpleMap (props) {
  var center;
  if(props.center){
    center = {lat:props.center.position.lat, lng:props.center.position.lng}
  } else {
    center = {lat: -25.363882, lng: 131.044922};
  }
  return (
    <section>
      <GoogleMap containerProps={{
          style: {
            height: "50%",
          },
        }}
        defaultZoom={14}
        center={center}
        onClick={()=>{console.log('poop')}}
      >
        {props.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
               />
          );
        })}
      </GoogleMap>
    </section>
  );
}