module.exports = {
  NAME: process.env.NAME || 'micro-mail',
  VERSION: process.env.VERSION || '1.2.3',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SENDGRID_SECRET: process.env.SENDGRID_SECRET || 'secret',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'mail-service',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
