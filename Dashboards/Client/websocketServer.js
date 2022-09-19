exports.newWebSocketsServer = function newWebSocketsServer() {
    
    let thisObject = {
        initialize: initialize,
        finalize: finalize
    }

    const WEB_SOCKET = SA.nodeModules.ws
    const port = '18043' //global.env.DASHBOARDS_WEB_SOCKETS_INTERFACE_PORT
    let socketServer
    let UISocket

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
                            //console.log(message)
                            //console.log('Message Received: ' + message.toString().substring(0, 10000))
                        }
                        
                        let messageArray = message.toString().split('|*|')

                        let dateTime = messageArray[0]
                        let origin = messageArray[1] // First argument should be the origin of the message
                        let messageType = messageArray[2] // Second is the type of message being sent
                        let messageString = messageArray[3] // Third is the name of the message if specified otherwise it is the message content
                        // All other objects sent in the message will be appended starting on position 3 and onward.

                        // Handle messages from various sources 
                        if (origin !== "UI") {
                            if (messageType === "Info") {
                                console.log('[Info] ', origin, '-->', messageString)

                            } else if (messageType === "Error") {
                                console.log('[Error] ', origin, '-->', messageString)

                            } else if (messageType === "Data") {
                                // Generic handlier for incoming data
                                // Expects valid JSON formatted data
                                let dataKey = origin + '-' + messageString 
                                let dataContent = []
                                try {
                                    for (let i = 4; i < messageArray.length; i++){
                                        try {
                                            let messageObject = JSON.parse(messageArray[i])
                                            dataContent.push(messageObject)
                                        } 
                                        catch (err) {
                                            console.log((new Date()).toISOString(), '[Error] Dashboard App -> Cannot parse data -> Data from: ', dataKey, ' -> ', err)
                                        }
                                    }
                                    
                                    // forward data to UI
                                    if (UISocket !== undefined) {
                                        let message = dateTime + '|*|' + dataKey + '|*|' + JSON.stringify(dataContent)
                                        UISocket.send(message)
                                    }
                                }
                                catch (err) {
                                    console.log((new Date()).toISOString(), '[Error] Dashboard App -> cannot update data map -> Data from: ', dataKey, ' -> ', err)
                                }
                            }

                        } else if (origin === "UI") {
                            // messages coming from UI
                            if (messageType === "Info") {
                                console.log ('[Info] ', messageString)
                                if (UISocket === undefined) {
                                    UISocket = socket // Store UI socket for message forwarding
                                }
                                
                            } else if (messageType === "Startup") {
                                console.log ('[Startup] ', messageString)
                                UISocket = socket // Store UI socket for message forwarding
                            }
                        }

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
