const MongoClient = require('mongodb').MongoClient;
const constants = require('./constants');

const mongo = {
  get: async (callback) => {
    const client = new MongoClient(constants.MONGO_URI, { useUnifiedTopology: true });

    client.connect(err => client.db('beers').collection('beers').find({}).toArray((err, res) => {if (err) throw err; callback(res)}));
    client.close();
  },
  set: async (data) => {
    const client = new MongoClient(constants.MONGO_URI, { useUnifiedTopology: true });
    const filteredData = data.map(item => ({name: item.name, tagline: item.tagline, image: item.image_url}));

    client.connect(err => client.db('beers').collection('beers').insertMany(filteredData));
    client.close();
  },
}

module.exports = mongo;