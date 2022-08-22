const run = () => {
    const express = require('express')
    const https = require('https')

    const app = express()

    const port = 6003

    const sslCertificate = require('./ssl')

    const env = require('./env')

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', env.allowCorsFromUrl)
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        )
        next()
    })

    app.get('/fetchRandom', (req, res) => {
        const { getRandomParticipantList} = require('../lib/randomParticipantFactory') // this is an es6 module. use the 'esm' package to require and run this server
        const { participantToCsString } = require('../lib/clientStates') // this is an es6 module. use the 'esm' package to require and run this server

        const randomParticipants = getRandomParticipantList(19)

        let csListString = ''
        randomParticipants.forEach(participant => csListString += participantToCsString(participant))

        res.send(csListString)
    })

    https.createServer(sslCertificate, app)
        .listen(port, function() {
            console.log('ClientStates server listening on port', port)
        })

}

module.exports = run
