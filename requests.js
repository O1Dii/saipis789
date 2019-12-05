const queryString = require('query-string'); // маленькая библиотека для создания query params из объекта
const fetch = require('node-fetch'); // fetch для ноды

module.exports = {
    GET: (baseUrl, params) => {
        const url = `${baseUrl}?${queryString.stringify(params)}`;

        return fetch(url, { method: 'GET' }); // method: 'GET' можно не писать (наверное)
    }
}