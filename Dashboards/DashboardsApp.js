exports.newDashboardsApp = function newDashboardsApp() {

    let thisObject = {
        run: run
    }

    return thisObject

    async function run() {

        process.on('uncaughtException', function (err) {
            if (err.message && err.message.indexOf("EADDRINUSE") > 0) {
                console.log("The Superalgos Dashboards Client cannot be started. Reason: the port configured migth be being used by another application, or Superalgos Dashboards Client might be already running.")
                return
            }
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> uncaughtException -> err.message = ' + err.message)
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> uncaughtException -> err.stack = ' + err.stack)
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> uncaughtException -> err = ' + err)
            process.exit(1)
        })

        process.on('unhandledRejection', (reason, p) => {
            // Signal user that a necessary node module is missing
            if (reason.code == 'MODULE_NOT_FOUND') {
                console.log("[ERROR] Dependency library not found. Please try running the 'node setup' command and then restart the Superalgos Dashboards Client.")
                console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> reason = ' + JSON.stringify(reason))
                process.exit(1)
            }
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> unhandledRejection -> reason = ' + JSON.stringify(reason))
            console.log((new Date()).toISOString(), '[ERROR] Dashboards App -> unhandledRejection -> p = ' + JSON.stringify(p))
            process.exit(1)
        })
        try {
            /* Callbacks default responses. */

            global.DEFAULT_OK_RESPONSE = {
                result: "Ok",
                message: "Operation Succeeded"
            };

            global.DEFAULT_FAIL_RESPONSE = {
                result: "Fail",
                message: "Operation Failed"
            };

            global.DEFAULT_RETRY_RESPONSE = {
                result: 'Retry',
                message: 'Retry Later'
            }

            global.CUSTOM_OK_RESPONSE = {
                result: 'Ok, but check Message',
                message: 'Custom Message'
            }

            global.CUSTOM_FAIL_RESPONSE = {
                result: 'Fail Because',
                message: 'Custom Message'
            }

            /* Servers */
            let WEBSOCKET_SERVER = require('./Client/websocketServer.js')

            /* Network Interfaces */

            /*
            Setting up servers running inside this Client.
            */
            DS.servers = {}
            console.log('SUPERALGOS DASHBOARDS CLIENT SERVERS:')
            console.log('')

            DS.servers.WEBSOCKET_SERVER = WEBSOCKET_SERVER.newWebServer()
            DS.servers.WEBSOCKET_SERVER.initialize()
            DS.servers.WEBSOCKET_SERVER.run()
            console.log('Websocket Server .................................................. Started')

            console.log('')
            console.log("You are running Superalgos Platform " + SA.version)
            console.log('')
            console.log("What's new? These are the main new features in this version:")
            console.log('')
            console.log('Superalgos P2P Network ...................................... Allows interconnecting clients so that users may collaborate.')
            console.log('Real-time Trading Signals ................................... Enables the broadcasting and consumption of trading signals.')
            console.log('Portfolio Manager ........................................... Portfolio Manager bots supervise and manage Trading Bots for improved capital allocation and risk management.')
            console.log('')
            console.log("What's next? This is the current development pipeline:")
            console.log('')
            console.log('Superalgos Mobile ........................................... Will allow users to consume trading signals from their mobile phones.')
            console.log('')
            console.log('Join the @superalgosdevelop Telegram Group to learn more!')

            console.log('')

        } catch (err) {
            console.log((new Date()).toISOString(), '[ERROR] Platform App -> Error = ' + err.stack)
        }
    }
}
