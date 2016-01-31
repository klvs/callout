import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap'
import CalloutThumb from './CalloutThumb'
import { Link } from 'react-router'
import * as constants from './constants';

const styles = {
	"max-width": "90%"
}

export default class CalloutThumbs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thumbs: [],
			skip: 0
		}
		this.componentWillMount = this.componentWillMount.bind(this)
		this.getCallouts = this.getCallouts.bind(this)
	}

	componentWillMount() {
		this.getCallouts();
	}

	getCallouts() {
		fetch(constants.API_ROOT + 'callouts?filter[order]=time desc&filter[limit]=5&filter[skip]=' + this.state.skip ).then((request)=>{
				return request.json()
			}).then((response=>{
				this.setState({
					thumbs: this.state.thumbs.concat(response),
			})
		}))
		this.setState({skip: this.state.skip+5})
	}


  render() {
    return (
    	<div style={styles}>
      <Row>
        {this.state.thumbs.map((datum)=>{
         return <Link key={datum.id} to={`/callouts/${datum.id}`}> <CalloutThumb data={datum}/> </Link>
        })}
      </Row>
      <Button onClick={this.getCallouts} block>load more</Button>
      </div>
    );
  }
}
