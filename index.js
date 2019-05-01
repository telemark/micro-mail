const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handler = require('./lib/handler')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
router.use(jwt({ secret: process.env.JWT_SECRET }))
router.use(handleUnauthorized)

// ROUTES
router.post('/mail', handler.deliverMail)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
