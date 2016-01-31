import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import CalloutThumb from './CalloutThumb'
import { Link } from 'react-router'

export default class CalloutThumbs extends Component {
  render() {
    return (
      <Row>
        {this.props.thumbs.map((datum)=>{
         return <Link key={datum.id} to={`/callouts/${datum.id}`}> <CalloutThumb data={datum}/> </Link>
        })}
      </Row>
    );
  }
}
