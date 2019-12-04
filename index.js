const express = require('express');
const path = require('path');
const mongo = require('./mongo');
const requests = require('./requests');
const constants = require('./constants');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'scripts')));

app.get('/', async function(req, res) {
    mongo.get((result) => res.render(path.join(__dirname, 'index'), {beers: result}));
});

requests.GET(constants.API_URL).then(response => response.json()).then(json => mongo.set(json)).catch(err => console.error(err));

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});
