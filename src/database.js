const mongoose = require('mongoose');
const {
  mongo,
  env
} = require('./config');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(`MongoDB connection error: ${err}`);
  // eslint-disable-next-line no-process-exit
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', false);
}

/**
 * Connect to mongo db
 * 
 * @return {object} Mongoose connection
 * @public
 */

exports.connect = () => {
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useCreateIndex: true,
    useNewUrlParser: true
  });

  return mongoose.connection;
};