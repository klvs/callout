import React, { Component } from 'react';
import Location from './Location';
import BSNav from './BSNav'
import { Row } from 'react-bootstrap'
import './geo';
import CalloutThumbs from './CalloutThumbs'
import * as constants from './constants'

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
	    	callouts: [], // empty to start
	  	}
		this.render = this.render.bind(this);
	}
	componentDidMount() {
		// console.log(navigator.location.getCurrentPosition());
		navigator.geolocation.getAccurateCurrentPosition(position=> {
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
		}, err=>{console.log(err)},
		intermediatePosition=>{
			this.setState({				
				markers: [{
			      position: {
			        lat: intermediatePosition.coords.latitude,
			        lng: intermediatePosition.coords.longitude,
			      },
			      key: "You",
			      defaultAnimation: 2,
		    	}],
	  		})
		})

		// get the data
		fetch(constants.API_ROOT + 'callouts').then((request)=>{
			return request.json()
		}).then((response=>{
			console.log(response);
			this.setState({callouts: response})
		}))
	}

  render() {
    return (
	    	<div className="container">
	    	<BSNav/>
		    <Location value={this.state.markers}/>
		    <CalloutThumbs thumbs={this.state.callouts}/>
	    	</div>

    );
  }
}
