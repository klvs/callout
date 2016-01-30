import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap'
const styles = {
	color: 'red',
};

export default class CalloutThumb extends Component {

  render() {
    return (
      <Col xs={12} sm={12} md={6} lg={4}>
      	<h2 style={styles}>test</h2>
      	<Image className="img-responsive" src={this.props.data.url} rounded/>
      </Col>
    );
  }
}
