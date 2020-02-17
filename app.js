const express = require('express');
const views = require('./views');
const stuff = require('./data');
const fetch = require('node-fetch');
const app = express();

app.get('/api', (req, res) => {

    const perPage = 'perPage' in req.query && Number(req.query.perPage) ? Number(req.query.perPage) : 3;
    const currentPage = 'page' in req.query && Number(req.query.page) ? Number(req.query.page) : 1;
    const urlPrefix = '/api?page=';
    const pages = Math.ceil(stuff.length/perPage);

    res.json({
        info: {
            count: stuff.length,
            pages,
            next: getNextPageUrl(currentPage, pages, urlPrefix),
            prev: getPrevPageUrl(currentPage, urlPrefix),
            currentPage,
            perPage,
        },
        results: stuff.slice((currentPage-1)*perPage,currentPage*perPage)
    });
});
app.get('/', (req, res) => {
    fetch(`http://localhost:3000/api?page=${req.query.page ? req.query.page : 1}`)
        .then(result => result.json())
        .then(result => {
            const {info, results} = result;
            const html = '<tbody>' + results.map(el => '<tr>' + Object.values(el).map(elem => `<td>${elem}</td>`).join('') + '</tr>').join('') + '</tbody>';
            const pages = new Array;
            for(let i = 1; i <= info.pages; i++) {
                pages.push(`<a href="?page=${i}">${i}</a>`);
            }
            res.send(views(html, pages.join('')));
        });
});

const getNextPageUrl = (current_page, total_pages, url_prefix) => current_page < total_pages ? `${url_prefix}${current_page+1}` : null;
const getPrevPageUrl = (current_page, url_prefix) => current_page > 1 ? `${url_prefix}${current_page-1}` : null;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server was runnig...');
});
