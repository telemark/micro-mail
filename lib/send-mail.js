'use strict'

const logger = require('./logger')

module.exports = async data => {
  const mail = require('@sendgrid/mail')
  mail.setApiKey(process.env.SENDGRID_SECRET)
  const msg = {
    to: data.to,
    from: data.from,
    subject: data.subject,
    text: data.text
  }

  if (data.html) {
    msg.html = data.html
  }

  if (data.cc) {
    msg.cc = data.cc
  }

  if (data.bcc) {
    msg.bcc = data.bcc
  }

  if (data.replyTo) {
    msg.replyTo = data.replyTo
  }

  try {
    const response = await mail.send(msg)
    logger('success', ['send-mail', 'success'])
    return response
  } catch (error) {
    logger('error', ['send-mail', error])
    throw error
  }
}
