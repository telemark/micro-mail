const { json, send } = require('micro')
const sendMail = require('./lib/send-mail')
const logger = require('./lib/logger')

async function deliverMail (request, response) {
  const data = await json(request)
  try {
    const result = await sendMail(data)
    logger('info', ['index', 'deliverMail', 'success'])
    send(response, 200, result)
  } catch (error) {
    logger('error', ['index', 'deliverMail', error])
    send(response, 500, error)
  }
}

module.exports = require('./lib/check-token')(deliverMail)
