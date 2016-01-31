import React, { Component } from 'react';
import SimpleMap from './SimpleMap';

export default class Location extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <SimpleMap center={this.props.center}
          markers={this.props.value}
        />
      </div>
    );
  }
}
