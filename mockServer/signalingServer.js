const run = () => {
    const https = require("https")

    const port = 6001

    const sslCertificate = require("./ssl")

    const server = https.createServer(sslCertificate)

    const io = require("socket.io")(server, {
        path: "",
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    })

    io.on("connect", payload => {
        console.log("Client connected")
    })

    io.on("disconnect", () => {
        console.log("Client disconnected")
    })

    server.listen(port, () => {
        console.log("Signaling server listening on port", port)
    })
}

module.exports = run