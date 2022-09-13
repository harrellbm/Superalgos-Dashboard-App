exports.newWebSocketsServer = function newWebSocketsServer() {
    
    let thisObject = {
        initialize: initialize,
        finalize: finalize
    }

    const WEB_SOCKET = SA.nodeModules.ws
    const port = '18043' //global.env.DASHBOARDS_WEB_SOCKETS_INTERFACE_PORT
    let socketServer

    const LOG_INFO = true
   
    return thisObject

    function initialize () {
        try {
            socketServer = new WEB_SOCKET.Server({ port: port })

            socketServer.on('connection', onConnection)

            function onConnection(socket) {
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
                        
                        let messageArray = message.toString().split('|*|')

                        let origin = messageArray[0]
                        let messageType = messageArray[1]
                        let messageString = messageArray[2]

                        if (origin === "Platform") {
                            if (messageType === "Info") {
                                console.log('[Info] ', messageString)
                            } else if (messageType === "Error") {
                                console.log('[Error] ', messageString)
                            } else if (messageType === "Globals") {
                                for (let i = 2; i < messageArray.length; i++){
                                    let messageObject = JSON.parse(messageArray[i])
                                    console.log("this is a Global Object", messageObject)
                                }
                            }
                        }

                        //socket.send(message)
                    } catch (err) {
                        console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> Web Sockets Interface -> run -> onConnection -> onMenssage. err = ' + err.stack)
                    }
                }
        }
        } catch (err) {
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> Web Sockets Interface -> run -> err.message = ' + err.message)
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> Web Sockets Interface -> run -> err.message = ' + err.stack)
        }
    }

    function finalize () {

    }
}
