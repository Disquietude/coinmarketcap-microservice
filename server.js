const express = require('express');
const app = express();
const cors = require('cors');
const rp = require('request-promise');
const path = require('path');

require('dotenv').config();

app.use(cors({optionsSuccessStatus: 200}));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
  qs: {
    limit: 10
  },
  headers: {
    'X-CMC_PRO_API_KEY': process.env.API_KEY
  },
  json: true,
  gzip: true
};

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  rp(requestOptions).then(response => {
    console.log('API call response:', response);
    res.json(response);
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});