const corsMiddleware = require('restify-cors-middleware');

   const cors = corsMiddleware({
   preflightMaxAge: 5,
   origins: ['*'],
   allowHeaders: ['*','token'],
   exposeHeaders: ['*','token']
  })

   module.exports = cors