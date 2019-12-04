const queryString = require('query-string');
const fetch = require('node-fetch');

module.exports = {
    GET: (baseUrl, params) => {
        const url = `${baseUrl}?${queryString.stringify(params)}`;

        return fetch(url, { method: 'GET' });
    }
}