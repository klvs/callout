import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap'
const styles = {
	color: 'white',
	position: 'absolute',
	bottom: '10px',
	background: 'rgba(0,0,0,0.5)',
	padding: '10px 10px 10px 10px',
	zIndex: '9999'
};

const colStyle = {
	paddingLeft: '0px',
	paddingRight: '0px',
	position: 'relative',
	width: '33.3%',
	height: '20%',
	overflow: 'hidden'
}

const imgStyle = {
	position: 'absolute',
	left: '50%',
	top: '50%',
	width: '100%',
	height: 'auto',
	transform: 'translate(-50%,-50%)'
}

export default class CalloutThumb extends Component {

  render() {
    return (
      <Col class="clearfix" style={colStyle} xs={4} sm={4} md={4} lg={4}>
      	<h2 style={styles}>{this.props.data.desc.title}</h2>
      	<Image style={imgStyle} className="img-responsive" src={this.props.data.url} />
      </Col>
    );
  }
}
