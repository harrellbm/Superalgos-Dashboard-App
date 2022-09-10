const ws = require('ws');
const url = 'ws://localhost:'
const port = '18042'

const LOG_INFO = true

try {
    socketServer = new ws.Server({ port: port })

    console.log('Opening Inspector...')

    socketServer.on('connection', onConnection)

    function onConnection(socket) {

                let lastNonce = -1
                if (LOG_INFO === true) {
                    console.log('New Websocket Connection.')
                }

                socket.on('message', onMenssage)

                function onMenssage(message) {
                    // Here is where all messages will be received through the websocket
                    try {
                        if (LOG_INFO === true) {
                            //console.log(JSON.parse(message))
                            //console.log('Message Received: ' + message.toString().substring(0, 10000))
                        }

                        //let messageObject = JSON.parse(message)
                        
                        let messageArray = message.toString().split('|*|')

                        let messageType = messageArray[0]
                        let messageString = messageArray[1]
                        //let messageToEventServer = messageArray[2]

                        if (messageType === "Info") {
                            console.log('[Info] ', messageString)
                        } else if (messageType === "Error") {
                            console.log('[Error] ', messageString)
                        } else if (messageType === "Globals") {
                            for (let i = 1; i < messageArray.length; i++){
                                let messageObject = JSON.parse(messageArray[i])
                                console.log("this is a Global Object", messageObject)
                            }
                        }

                        //socket.send(message)
                    } catch (err) {
                        console.log((new Date()).toISOString(), '[ERROR] Inspector -> Web Sockets Interface -> run -> onConnection -> onMenssage. err = ' + err.stack)
                    }
                }
    }
} catch (err) {
    console.log((new Date()).toISOString(), '[ERROR] Inspector -> Web Sockets Interface -> run -> err.message = ' + err.message)
    console.log((new Date()).toISOString(), '[ERROR] Inspector -> Web Sockets Interface -> run -> err.message = ' + err.stack)
}


