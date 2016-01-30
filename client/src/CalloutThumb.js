import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap'

export default class CalloutThumb extends Component {
  render() {
    return (
      <Col xs={12} sm={12} md={6} lg={4}>
      	<Image className="img-responsive" src={this.props.data.url} rounded/>
      </Col>
    );
  }
}
