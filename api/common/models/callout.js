var shortid = require('shortid')
const fileType = require('file-type')

module.exports = function(Callout) {
	Callout.observe('before save', function uploadToS3(ctx, next) {
		var data;
		if(ctx.instance)
			data = ctx.instance;
		else
			data = ctx.data;

		data.time = new Date();

		next();
	});
};
