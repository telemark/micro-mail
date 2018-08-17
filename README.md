[![Build Status](https://travis-ci.org/telemark/micro-mail.svg?branch=master)](https://travis-ci.org/telemark/micro-mail)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-mail

Microservice for sending emails

## API

All calls must supply a valid jwt

### ```POST /mail```

Send mail

```JavaScript
{
  from: '<from-mail>',
  to: '<to-mail>',
  subject: '<subject>',
  text: '<plain-text>',
  cc: '<cc-mail>', // Optional
  bcc: '<bcc-mail>', // Optional
  replyTo: '<replyTo-mail>', // Optional
  html: '<html>' // Optional
}
```

```bash
$ curl -v -H "Authorization: <INSERT TOKEN>" -d '{ "from": "from@example.com", "to": "to@example.com", "subject": "Do you read me?", "text": "Loud and clear!" }' https://mail.service.io/mail
```

## License

[MIT](LICENSE)

![Robohash image of micro-mail](https://robots.kebabstudios.party/micro-mail.png "Robohash image of micro-mail")