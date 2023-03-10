// const lvnsConfig = require("app/mockServer/configs/lvns/config");

const run = () => {
  const express = require('express')
  const http = require('http')
  const app = express()
  const port = 6002
  const sslCertificate = require('./ssl')
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

  // app.get('/configs/lvns', (req, res) => {
  //   const lvnsConfig = require('./configs/lvns/config')
  //   res.send(lvnsConfig)
  // })
  //
  // app.get('/configs/ladd', (req, res) => {
  //   const lvnsConfig = require('./configs/ladd/config')
  //   res.send(lvnsConfig)
  // })

  app.get('/actors', (req, res) => {
    const actors = require('./entities/actors')
    res.send(actors)
  })

  app.get('/actors/3783', (req, res) => {
    const actor = require('./entities/actor')
    res.send(actor)
  })

  http.createServer(sslCertificate, app)
    .listen(port, function () {
      console.log('REST server listening on port', port)
    })
}

module.exports = run
