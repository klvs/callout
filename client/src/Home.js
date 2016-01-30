import React, { Component } from 'react';

export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			markers: [{
		      position: {
		        lat: 25.0112183,
		        lng: 121.52067570000001,
		      },
		      key: "Taiwan",
		      defaultAnimation: 2,
	    	}],
	  	}
		this.render = this.render.bind(this);
	}
	componentDidMount() {
		// console.log(navigator.location.getCurrentPosition());
		navigator.geolocation.getCurrentPosition((position)=>{
			this.setState({				
				markers: [{
			      position: {
			        lat: position.coords.latitude,
			        lng: position.coords.longitude,
			      },
			      key: "You",
			      defaultAnimation: 2,
		    	}],
	  		})
		})
	}

  render() {
    return (
    	<div>
	    	<h1>{this.state.markers[0].position.lat}</h1>
	    	<h1>{this.state.markers[0].position.lng}</h1>
    	</div>
    );
  }
}
