module.exports = {
  "mongo": {
    "name": "mongo",
    "connector": "mongodb",
	"host": process.env.MONGO_HOST,
	"database": process.env.MONGO_DB,
	"username": process.env.MONGO_USERNAME,
	"password": process.env.MONGO_PASSWORD,
	"port": 27017
  }
}
