import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap'
const styles = {
	color: 'white',
	position: 'absolute',
	bottom: '10px',
	background: 'rgba(0,0,0,0.5)',
	padding: '10px 10px 10px 10px',
	zIndex: '999'
};

const colStyle = {
	paddingLeft: '0px',
	paddingRight: '0px',
	position: 'relative',
	maxWidth: '50%',
	height: '20%',
	overflow: 'hidden'
}

const imgStyle = {
	position: 'absolute',
	left: '50%',
	top: '50%',
	width: '100%',
	height: 'auto',
	'WebkitTransform': 'translate(-50%,-50%)',
	'msTransform': 'translate(-50%,-50%)',
	transform: 'translate(-50%,-50%)'
}

export default class CalloutThumb extends Component {

  render() {
    return (
      <Col style={colStyle} xs={6} sm={6} md={6} lg={6}>
      	<h3 style={styles}>{this.props.data.desc.title}</h3>
      	<Image style={imgStyle} className="img-responsive" src={this.props.data.url} />
      </Col>
    );
  }
}
