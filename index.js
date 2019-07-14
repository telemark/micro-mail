const sendMail = require('./lib/send-mail')
const logger = require('./lib/logger')

async function deliverMail (request, response) {
  const data = request.body
  try {
    const result = await sendMail(data)
    logger('info', ['index', 'deliverMail', 'success'])
    response.json(result)
  } catch (error) {
    logger('error', ['index', 'deliverMail', error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('./lib/check-token')(deliverMail)
