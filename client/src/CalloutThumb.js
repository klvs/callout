import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap'
const styles = {
	color: 'white',
	position: 'absolute',
	bottom: '10px',
	overflow:'hidden',
	background: 'rgba(0,0,0,0.5)',
	padding: '10px 10px 10px 10px'
};

const colStyle ={
	paddingLeft:'0px',
	paddingRight: '0px',
	maxHeight: '200px'
}

export default class CalloutThumb extends Component {
	
  render() {
    return (
      <Col style={colStyle} xs={6} sm={6} md={6} lg={6}>
      	<h2 style={styles}>{this.props.data.desc.title}</h2>
      	<Image className="img-responsive" src={this.props.data.url} />
      </Col>
    );
  }
}
