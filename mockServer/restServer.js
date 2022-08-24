const run = () => {
  const express = require('express')
  const http = require('http')

  const app = express()

  const port = 6002

  const sslCertificate = require('./ssl')

  // const {getRandomParticipantList} = require('./lib/randomParticipantFactory')
  const env = require('./env')

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', env.allowCorsFromUrl)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    next()
  })

  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  app.get('/participants', (req, res) => {
    const mockActivities = require('./mockActivities')
    // res.send(getRandomParticipantList(19))
    res.send(mockActivities)
  })

  http.createServer(sslCertificate, app)
    .listen(port, function () {
      console.log('REST server listening on port', port)
    })

}

module.exports = run
