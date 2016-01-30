var AWS = require('aws-sdk')
var shortid = require('shortid')
const fileType = require('file-type')

var bucket = process.env.AWS_BUCKET || '';
var s3url = 'https://' + bucket + '.s3.amazonaws.com/'

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
		var mimeFromBuffer = fileType(image) || {'ext': 'jpg', 'mime': 'image/jpeg'};
		var key = imageId + '.' + mimeFromBuffer.ext;
		data.url = s3url + key;
		var s3 = new AWS.S3();
		s3.putObject({
			"Bucket": bucket,
			"Key": key,
			"ACL": 'public-read',
			"Content-Type": mimeFromBuffer.mime,
			"Body": image
		}, function(err) {
			if(err)
				console.log(err);
			next();
		});
	});
};
