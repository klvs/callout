import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import CalloutThumb from './CalloutThumb'

export default class CalloutThumbs extends Component {
  render() {
    return (
      <Row>
        {this.props.thumbs.map((datum)=>{
          <CalloutThumb data={datum}/>
        })}
      </Row>
    );
  }
}
