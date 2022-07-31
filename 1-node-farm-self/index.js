//Core module
//It will return an object that has many method
const fs = require('fs'); //File system module
const http = require('http'); //For networking capabilities like building an http server
const url = require('url'); //For routing

//third party module
const slugify = require('slugify');

//our own module
const replaceTemplate = require('./modules/replaceTemplate'); //our own module

///////////////////////////////////////////////////////////////////////////////////////////////
// S E R V E R //

//top-level approach : it will wait for the response but only once the callback function of server will get executed
//each time a request is made so it is okay to wait for once (at the starting of the server).

//we using sync because using async doesn't really matter cause it is either way gonna run only one time
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);


const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data); //an array

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  //Overview
  if (pathname === '/' || pathname === '/overview') {
    //writeHead is a piece of response that we send back
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    // console.log(cardHtml);
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardHtml);
    res.end(output);
  }

  //Product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    //query
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }

  //Not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to port');
});
