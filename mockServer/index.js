require = require("esm")(module/*, options*/) // enables es6 modules in node.js

const runSignalingServer = require('./signalingServer')
const runRestServer = require('./restServer')
const runClientStateServer = require('./clientStateServer')

runSignalingServer()
runRestServer()
runClientStateServer()