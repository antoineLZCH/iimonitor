const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const Ddos = require('ddos');
const morgan = require('morgan');
const error = require('./middlewares/error');
// const routes = require('./api/v1/router');


const {
  whitelist,
  ddosConfig
} = require('./config');

const ddosInstance = new Ddos(ddosConfig);

const corsOptions = {
  exposedHeaders: 'authorization, x-refresh-token, x-token-expiry-time',
  origin: (origin, callback) => {
    if (!whitelist || whitelist.includes(origin)) callback(null, true);
    else(new Error('Not Allowed by CORS.'))
  }
}

const server = express();

server.use(ddosInstance.express);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(morgan('combined'));
server.use(compress())
server.use(helmet());
server.use(cors(corsOptions));

// server.use('/v1', routes);

server.use(error.converter);

server.use(error.notFound);

server.use(error.handler)

module.exports = server;