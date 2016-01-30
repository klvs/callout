var AWS = require('aws-sdk')
var shortid = require('shortid')

var s3url = 'https://s3-us-west-1.amazonaws.com/callout-imgs/'

module.exports = function(Callout) {
	Callout.observe('before save', function uploadToS3(ctx, next) {
		var data;
		if(ctx.instance)
			data = ctx.instance;
		else
			data = ctx.data;
		var base64Str = data.url; 
		var image = new Buffer(base64Str, 'base64');
		var imageId = shortid.generate();
		var key = imageId + '.jpeg';
		data.url = s3url + key;
		var s3 = new AWS.S3();
		s3.putObject({
			Bucket: 'callout-imgs',
			Key: key,
			ACL: 'public-read',
			Body: image

		}, function(err) {
			if(err)
				console.log(err);
			next();
		});
	});
};
