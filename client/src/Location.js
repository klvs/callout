import React, { Component } from 'react';
import SimpleMap from './SimpleMap';

export default class Location extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Map</h1>
        <SimpleMap
          markers={this.props.value}
        />
        <input type="file" name="photo" accept="image/*" capture="camera"/>
      </div>
    );
  }
}
