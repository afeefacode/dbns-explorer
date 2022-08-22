const fs = require('fs')
const path = require('path')
const env = require('../env')

const keyFile = env.productionMode
  ? 'iws107.informatik.htw-dresden.de-key.pem'
  : 'localhost.key'

const certFile = env.productionMode
  ? 'iws107.informatik.htw-dresden.de-crt.pem'
  : 'localhost.crt'

const key = fs.readFileSync(path.join(__dirname, keyFile))
const cert = fs.readFileSync(path.join(__dirname, certFile))

const sslCertificate = {
  key, cert
}

module.exports = sslCertificate