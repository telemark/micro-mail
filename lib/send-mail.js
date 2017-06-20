'use strict'

const config = require('../config')
const logger = require('./logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const helper = require('sendgrid').mail
    const from = new helper.Email(data.from)
    const to = new helper.Email(data.to)
    const subject = data.subject
    const content = new helper.Content('text/plain', data.text)
    let mail = new helper.Mail(from, subject, to, content)

    if (data.html) {
      const richContent = new helper.Content('text/html', data.html)
      mail.addContent(richContent)
    }

    if (data.replyTo) {
      const replyTo = new helper.Email(data.replyTo)
      mail.setReplyTo(replyTo)
    }

    if (data.cc || data.bcc) {
      const personalization = new helper.Personalization()
      if (data.cc) {
        const cc = new helper.Email(data.cc)
        personalization.addCc(cc)
      }
      if (data.bcc) {
        const bcc = new helper.Email(data.bcc)
        personalization.addBcc(bcc)
      }
      mail.addPersonalization(personalization)
    }

    const sg = require('sendgrid')(config.SENDGRID_SECRET)
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    })

    sg.API(request, (error, response) => {
      if (error) {
        logger('error', ['send-mail', error])
        reject(error)
      } else {
        logger('success', ['send-mail', 'success'])
        resolve(response)
      }
    })
  })
}
