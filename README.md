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
$ curl -v -H "Authorization: <INSERT TOKEN>" -H "Content-Type: application/json" -d '{ "from": "from@example.com", "to": "to@example.com", "subject": "Do you read me?", "text": "Loud and clear!" }' https://mail.service.io/mail
```

## Development

You'll need the now-cli from ZEIT

```
$ now dev
```

## Deploy to ZEIT/Now - Manual

Change [now.json](now.json) to match your environment.

Run the deploy script.

```
$ npm run deploy
```

## Deploy to ZEIT/Now - Automatic

Setup GitHub actions to match your environment.

Do a release.

## License

[MIT](LICENSE)