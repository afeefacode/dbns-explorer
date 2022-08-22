require = require("esm")(module/*, options*/) // enables es6 modules in node.js

const runRestServer = require('./restServer')
const runClientStateServer = require('./clientStateServer')

runRestServer()
runClientStateServer()
