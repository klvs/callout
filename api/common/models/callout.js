var shortid = require('shortid')
const fileType = require('file-type')

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
				if 
				callout.save(function(err, callout) {
					if(err)
						cb(err, value);
					else
						cb(null, value);
				});
			}
		});
	};
	Callout.remoteMethod(
		'upvote',
		{
			http: { path: '/:id/upvote', verb: 'post' },
			accepts: { ard: 'id', type: 'string', required: true },
			returns: { arg: 'voteCount', type: 'number' }	
		}
	);
	Callout.remoteMethod(
		'downvote',
		{
			http: { path: '/:id/downvote', verb: 'post' },
			accepts: { ard: 'id', type: 'string', required: true },
			returns: [ { arg: 'err', type: 'string' }, { arg: 'voteCount', type: 'number' } ]	
		}
	);
};
