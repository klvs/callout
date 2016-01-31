var shortid = require('shortid')
const fileType = require('file-type')
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var twitterParams = {screen_name: 'Callout_City'};
var calloutVoteThreshold = 50;

module.exports = function(Callout) {
	Callout.observe('before save', function uploadToS3(ctx, next) {
		if (ctx.instance) // only change the time if this is a new callout
			ctx.instance.time = new Date();

		next();
	});

	Callout.upvote = function(calloutId, cb) {
		applyVote(calloutId, 1, cb)
	};

	Callout.downvote = function(calloutId, cb) {
		applyVote(calloutId, -1, cb)
	};

	function applyVote(calloutId, value, cb) {
		Callout.findById(calloutId, function(err, callout) {
			if(err)
				cb(err, 0);
			else {
				callout.voteCount += value;
				callout.save(function(err, callout) {
					if(err)
						cb(err, callout.voteCount);
					else {
						if(callout.voteCount >= calloutVoteThreshold && callout.posted)
							postToTwitter(callout, cb);
						else
							cb(null, callout.voteCount);
					}
				});
			}
		});
	};

	function postToTwitter(callout, cb) {
		var status = {status: 'Callout on ' + callout.desc.title + '! http://callout.city/callouts/' + callout.id}
		callout.posted = true;
		client.post('statuses/update', status, function(err, tweet, res) {
			if(err)
				cb(err, callout.voteCount);
			else {
				callout.save(function(saveErr, callout) {
					if(saveErr)
						cb(saveErr, callout.voteCount);
					else
						cb(null, callout.voteCount);
				});
			}
		});
	}

	Callout.remoteMethod(
		'upvote',
		{
			http: { path: '/upvote', verb: 'post' },
			accepts: { ard: 'id', type: 'string', required: true },
			returns: { arg: 'voteCount', type: 'number' }	
		}
	);
	Callout.remoteMethod(
		'downvote',
		{
			http: { path: '/downvote', verb: 'post' },
			accepts: { ard: 'id', type: 'string', required: true },
			returns: [ { arg: 'err', type: 'string' }, { arg: 'voteCount', type: 'number' } ]	
		}
	);
};
