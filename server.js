const express = require('express');
const app = express();
const cors = require('cors');
const rp = require('request-promise');
const path = require('path');

require('dotenv').config();

app.use(cors({optionsSuccessStatus: 200}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

let defaultOptions = {
  method: 'GET',
  json: true,
  gzip: true
};

let apiKey = {
  headers: {
    'X-CMC_PRO_API_KEY': process.env.API_KEY
  }
};

let defaultUri = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/';

//Get CoinMarketCap ID Map
app.get('/api/map/:limit?', (req, res) => {
  
  let requestOptions = Object.assign({uri: defaultUri + 'map'}, defaultOptions, apiKey);

  if (req.params.limit !== undefined) {
    requestOptions.qs = {
      limit: req.params.limit
    }
  }

  rp(requestOptions).then(response => {
    console.log('API call response:', response);
    res.json(response);
  }).catch((err) => {
    console.log('API call error:', err.message);
  });

});

//Get Market Quotes
app.get('/api/quotes/:ids/:convert?', (req, res) => {

  let requestOptions = Object.assign({uri: defaultUri + 'quotes/latest'}, defaultOptions, apiKey);

  requestOptions.qs = {
    id: req.params.ids,
    convert: req.params.convert || 'USD'
  }

  rp(requestOptions).then(response => {
    console.log('API call response:', response);
    res.json(response);
  }).catch((err) => {
    console.log('API call error:', err.message);
  })

});

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});