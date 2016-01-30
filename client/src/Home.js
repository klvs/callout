import React, { Component } from 'react';
import Location from './Location';
import BSNav from './BSNav'
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
	    	<BSNav/>
	    	<div className="container">
		    	<Location value={this.state.markers}/>
	    	</div>
    	</div>

    );
  }
}
