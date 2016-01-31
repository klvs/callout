import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap'

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

export default class SocialButtons extends Component {
	render() {
		var shareUrl = this.props.url;
		var shareTitle = this.props.title;
		return (
				<div>
						<FacebookShareButton
							url = { shareUrl }
							title = { shareTitle }
							className = "FacebookShareButton">
							<FacebookIcon
								size={32}
								round={true} />
						</FacebookShareButton>
						<TwitterShareButton
							url = { shareUrl }
							title = { shareTitle }
							className = "TwitterShareButton">
							<TwitterIcon
								size={32}
								round={true} />
						</TwitterShareButton>
				</div>
		);
	}
}
