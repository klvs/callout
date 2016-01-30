module.exports = {
	"s3": {
  		"name": "s3",
  		"connector": "loopback-component-storage",
		"provider": "amazon",
		"acl": "public-read",
		"keyId": process.env.s3KeyId,
		"key": process.env.s3Secret
    }
}
