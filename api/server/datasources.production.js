module.exports = {
	"mongo": {
		"name": "mongo",
		"connector": "mongodb",
		"host": process.env.MONGO_HOST,
		"database": process.env.MONGO_DB,
		"username": process.env.MONGO_USERNAME,
		"password": process.env.MONGO_PASSWORD,
		"port": 27017
	},
	"s3": {
		"name": "s3",
		"connector": "loopback-component-storage",
		"provider": "amazon",
		"keyId": process.env.AWS_ACCESS_KEY_ID,
		"key": process.env.AWS_SECRET_ACCESS_KEY,
		"acl": "public-read"
	}
}
