<template>
<router-view></router-view>
</template>

<script>
    import { computed } from 'vue'
    export default {
    
        data() {
            return {
                incomingDataMap: new Map(),
                dataKeyArray: []
            }
        },
        provide() {
            return {
            // Make incomingData variable available to all child elements
                incomingData: computed(() => this.incomingDataMap)
            }
        },
        provide() {
            return {
                dataKeyArray: computed(() => this.dataKeyArray)
            }
        },
        // Spin up websocket client on app mount
        mounted: function(){
            let socket = new WebSocket('ws://localhost:18043/');
            socket.onopen = () => {
                let message = (new Date()).toISOString() + '|*|UI|*|Startup|*|UI now connected via Websocket'
                socket.send(message)
            }
            socket.onmessage = (event) => {
                // Vue data binding means we don't need any extra work to
                // update the UI. Anytime a variable is updated from here the UI will follow
                console.log('recieved data', event)
                let messageArray = event.data.toString().split('|*|')

                let timestamp = messageArray[0] // First argument is timestamp 
                let dataKey = messageArray[1] // second is the data key assocated with the incoming data
                let dataContent = JSON.parse(messageArray[2]) // Third is an array of objects holding data

                this.incomingDataMap.set(dataKey, dataContent)
                if (this.dataKeyArray.includes(dataKey) === false){
                    this.dataKeyArray.push(dataKey)
                }
                
            }
            socket.onclose = (event) => {
                console.log('wesocket connection closed', event)
            }
        }
    }
</script>


