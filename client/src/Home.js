import React, { Component } from 'react';
import Location from './Location';
import BSNav from './BSNav'
import { Row } from 'react-bootstrap'
import SubmitButton from './SubmitButton'
import './geo';
import CalloutThumbs from './CalloutThumbs'
import * as constants from './constants';

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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCallouts = this.getCallouts.bind(this);
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
		this.getCallouts();
	}

	getCallouts() {
	fetch(constants.API_ROOT + 'callouts?filter[order]=desc').then((request)=>{
			return request.json()
		}).then((response=>{
			console.log(response);
			this.setState({callouts: response})
		}))		
	}

	handleSubmit(item) {
		var submission = {
			geo: {
				lat: this.state.markers[0].position.lat,
				lng: this.state.markers[0].position.lng
			},
			url: item.data_uri,
			desc: {
				title: item.title,
				desc: item.desc
			}
		}
		console.log(submission);
		fetch(constants.API_ROOT + 'callouts', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(submission)
		}).then(res=> {
			console.log("submit success")
			this.getCallouts();
		}).catch(err=> {
			console.log(err)
		});
		
	}

  render() {
    return (
	    	<div className="container">
	    	<BSNav/>
		    <Location value={this.state.markers}/>
		    <SubmitButton submitHandler={this.handleSubmit}/>
		    <CalloutThumbs thumbs={this.state.callouts}/>
	    	</div>
    );
  }
}
