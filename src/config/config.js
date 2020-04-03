require('dotenv').config();

let config = {
  ddosConfig: {
    burst: 100,
    limit: 100,
  },
  whitelist: null,
  port: 3001,
  env: process.env.NODE_ENV,
  baseUrl: 'http://localhost:3001',
  jwtExpirationInterval: 60 * 12,
  jwtSecret: 'qweqweuiquhjkdncjnzxncb12ne23h194y12u84134234h2j34h3',
  mongo: {
    uri: 'mongodb://localhost:27017/iimonitor-dev'
  },
  roles: ['admin', 'user'],
  socketPort: 3002,
  socketUrl: 'localhost',
  website: 'http://localhost:3000',
  emails: {
    'api-key': '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',
    from: {
      email: 'info@express.com',
      name: 'Express Boilerplate Platform',
    },
    templates: {
      'invite-email': '',
      'reset-password': '',
      verification: '',
    },
  },
  fcm: {
    'server-key': ''
  },
  mediaTypes: ['photo', 'video', 'document'],
  twilioConfig: {
    // Your Account SID from www.twilio.com/console
    accountSid: '',
    authToken: '',
    from: '',
  },
}

if (process.env.NODE_ENV === 'staging') {
  config = {
    ...config,
    mongo: {
      uri: 'mongodb://localhost:27017/iimonitor-staging'
    },
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    mongo: {
      uri: 'mongodb://localhost:27017/iimonitor-production'
    },
    whitelist: [],
  };
}

module.exports = config;