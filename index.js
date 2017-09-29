'use strict'

const readFileSync = require('fs').readFileSync
const md = require('markdown-it')()
const { parse } = require('url')
const { json, send } = require('micro')
const verifyJwt = require('./lib/verify-jwt')
const sendMail = require('./lib/send-mail')
const logger = require('./lib/logger')

module.exports = async (request, response) => {
  const { pathname, query } = await parse(request.url, true)

  if (pathname === '/mail') {
    const data = request.method === 'POST' ? await json(request) : query
    const verified = await verifyJwt(request)
    logger('info', ['index', 'mail', 'start'])
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    if (verified.isValid === true) {
      logger('info', ['index', 'mail', 'verified'])
      try {
        const result = await sendMail(data)
        logger('info', ['index', 'mail', 'success'])
        send(response, 200, result)
      } catch (error) {
        logger('error', ['index', 'mail', error])
        send(response, 500, error)
      }
    } else {
      logger('error', ['index', 'mail', 'Invalid token'])
      send(response, 401, new Error('Invalid token'))
    }
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    send(response, 200, md.render(readme))
  }
}
