var shortid = require('shortid')
const fileType = require('file-type')

module.exports = function(Callout) {
	Callout.observe('before save', function uploadToS3(ctx, next) {
		if (ctx.instance) // only change the time if this is a new callout
			ctx.instance.time = new Date();

		next();
	});
};
