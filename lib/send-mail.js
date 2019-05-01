'use strict'

const logger = require('./logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const mail = require('@sendgrid/mail')
    mail.setApiKey(process.env.SENDGRID_SECRET)
    let msg = {
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
      resolve(response)
    } catch (error) {
      logger('error', ['send-mail', error])
      reject(error)
    }
  })
}
