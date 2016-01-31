import React, { Component } from 'react';
import * as constants from './constants';

export default class SingleCallout extends Component {
	componentWillMount(){
		fetch(constants.API_ROOT + 'callouts/' + this.props.params.id).then((request)=>{
				return request.json()
			}).then((response=>{
				this.setState({
					callout: response
				})
			}))		
	}
  render() {
    return (
      <h1>
      	{this.props.params.id}
      </h1>
    );
  }
}
