const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')
const sendMail = require('./send-mail')
const logger = require('./logger')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.deliverMail = async (request, response) => {
  const data = await json(request)
  try {
    const result = await sendMail(data)
    logger('info', ['index', 'mail', 'success'])
    send(response, 200, result)
  } catch (error) {
    logger('error', ['index', 'mail', error])
    send(response, 500, error)
  }
}
