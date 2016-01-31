import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import CalloutThumb from './CalloutThumb'

export default class CalloutThumbs extends Component {
  render() {
    return (
      <Row>
        {this.props.thumbs.map((datum)=>{
         return <CalloutThumb key={datum.id} data={datum}/>
        })}
      </Row>
    );
  }
}
