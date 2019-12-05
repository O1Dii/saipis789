const MongoClient = require('mongodb').MongoClient; // можно использовать либо mongodb client, либо mongoose
const mongoose = require('mongoose'); // mongoose более высокоуровневый, это надстройка над mongodb client
const constants = require('./constants'); // импорт констант (урлы)

mongoose.connect(constants.MONGO_URI); 

const Beer = mongoose.model('Beer', // mongoose строится на моделях, здесь мы объявляем нашу главную модель
  {name: {type: String, unique: true, require: true},
    tagline: {type: String, require: true}, 
    image: String
  })

const mongooseHandler = { // объект обработчика mongoose
  get: (callback) => { // вызывает callback с результатами запроса
    Beer.find((err, res) => {if (err) throw err; callback(res)}); // find возвращает все, findOne - один
  },
  set: (data) => { // добавляет массив необходимых данных (все инстансы сразу)
    Beer.insertMany(data);
  }
}

const mongo = { // объект обработчика mongodb client
  get: (callback) => { // тож самое, что и у mongoose
    const client = new MongoClient(constants.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => client.db('beers')
                            .collection('beers')
                            .find() // find без аргументов возвращает все
                            .toArray((err, res) => {
                              if (err) throw err; 
                              callback(res);
                            }));
    client.close();
  },
  set: (data) => { // тож самое, что и у mongoose
    const client = new MongoClient(constants.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const filteredData = data.map(item => ({name: item.name, tagline: item.tagline, image: item.image_url}));

    client.connect(err => client.db('beers')
                            .collection('beers')
                            .insertMany(filteredData));
    client.close();
  },
}

// здесь мы выбираем, что экспортировать, мы можем экспортировать только один объект
module.exports = mongooseHandler; // в данном случае мы экспортируем mongoose, можно заменить на mongo, чтобы использовать mongodb client