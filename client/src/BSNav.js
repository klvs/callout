import React, { Component } from 'react';
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap'
import SocialButtons from './SocialButtons'

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const logo = {
  color: '#93c54b'
}

const nav = {
  marginBottom: '0px'
}

export default class BSNav extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Navbar style={nav}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/#!/">Callout <span style={logo}>{'{your city}'}</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
		  	<NavItem eventKey={1} href="#">Share this site to: </NavItem>
            <NavItem eventKey={2} href="#"><FacebookShareButton
				url = "callout.city"
				title = "CallOut"
				className = "FacebookShareButton">
				<FacebookIcon
					size={24}
					round={true} />
			</FacebookShareButton></NavItem>
		  	<NavItem eventKey={3} href="#"><TwitterShareButton
			  url = "callout.city"
			  title = "CallOut"
			  className = "TwitterShareButton">
			  <TwitterIcon
				  size={24}
				  round={true} />
		  	</TwitterShareButton></NavItem>
		  </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
