// скаченные или встроенные библиотеки
const express = require('express'); // библиотека для создания backend на ноде (самая популярная)
const path = require('path'); // встроенная библиотека для работы с путями
// наши модули
const mongo = require('./mongo');
const requests = require('./requests');
const constants = require('./constants');

const app = express(); // инициализируем app

app.set('view engine', 'ejs'); // устанавливаем, какой шаблонизатор используем (ejs)

// настраиваем static файлы
app.use(express.static(path.join(__dirname, 'styles'))); // конфигурируем styles
app.use(express.static(path.join(__dirname, 'scripts'))); // конфигурируем scripts

// заполняем mongodb, делая запрос на апи и прокидывая json результат в mongo.set
requests.GET(constants.API_URL)
    .then(response => response.json()) // получаем респонс, прокидываем дальше json из респонса
    .then(json => mongo.set(json)) // сетим в монго наш json
    .catch(err => console.error(err)); // ловим ошибки

// пишем роут для '/'
app.get('/', function(req, res) {
// вызываем mongo.get, куда прокидываем callback, который возвращает наш html с вставленными данными
    mongo.get((result) => res.render(path.join(__dirname, 'index'), {beers: result}));
});

// ставим сервер на прослушивание либо на указанном порту, либо на 4000
app.listen(process.env.PORT || 4000, function() {
    console.log('Your node js server is running');
});
