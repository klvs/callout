var mime = require('mime-types')
var shortid = require('shortid')

module.exports = function(app) {
	app.dataSources.s3.connector.getFilename = function(file, req, res) {
		var pattern = /^image\/.+$/;
		var value = pattern.test(file.type);

		if (value) {
			var extension = mime.extension(file.type);
			var random = shortid.generate();
			var newFileName = random + '.' + extension;

			return newFileName;
		}else{
			throw "FileTypeError: only images are allowed;"
		}
	}
}
