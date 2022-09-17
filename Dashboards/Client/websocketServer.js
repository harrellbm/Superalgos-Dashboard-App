exports.newWebSocketsServer = function newWebSocketsServer() {
    
    let thisObject = {
        initialize: initialize,
        finalize: finalize
    }

    const WEB_SOCKET = SA.nodeModules.ws
    const port = '18043' //global.env.DASHBOARDS_WEB_SOCKETS_INTERFACE_PORT
    let socketServer
    let dataMap = new Map()

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

                        let origin = messageArray[0] // First argument should be the origin of the message
                        let messageType = messageArray[1] // Second is the type of message being sent
                        let messageString = messageArray[2] // Third is the name of the message if specified otherwise it is the message content
                        // All other objects sent in the message will be appended starting on position 3 and onward.

                        // Handle messages from various sources 
                        if (origin !== "UI") {
                            if (messageType === "Info") {
                                console.log('[Info] ', origin, '-->', messageString)

                            } else if (messageType === "Error") {
                                console.log('[Error] ', origin, '-->', messageString)

                            } else if (messageType === "Data") {
                                let dataKey = origin + '-' + messageString 
                                let dataContent = []
                                for (let i = 3; i < messageArray.length; i++){
                                    let messageObject = JSON.parse(messageArray[i])
                                    dataContent.push(messageObject)
                                }
                                dataMap.set(dataKey, dataContent)
                                console.log("this is the data Map after update", dataMap)

                            }

                        } else if (origin === "UI") {
                            if (messageType === "Info") {
                                console.log ('[Info] ', messageString)
                                
                            } else if (messageType === "Startup") {
                                console.log ('[Startup] ', messageString)
                                let data = gatherDashboardData()
                                socket.send(data)
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

    function gatherDashboardData () {
        //TODO: create data structure engine for dashboards 
        //TODO: save incoming data to data strucuturs 
        //TODO: load those data structures here and send to UI
        let data = "Here is some fake data to load"
        return data
    }
}
