<template>
    <div class="nav-bar"><img class="logo" :src="logo" ><button class="nav-btn">Dashboards</button></div>

    <router-view :incomingData="incomingDataObj"></router-view>
<!--<globals-view :incomingData="incomingDataObj"></globals-view>-->
</template>

<script>
    import { computed } from 'vue'
    import GlobalsView from './globalsView.vue'
    import logo from "./assets/superalgos-logo-white.png"
    import background from "./assets/superalgos-header-background.png"

    export default {
        components: { GlobalsView },
        data() {
            return {
                test: 'this is a test',
                incomingDataObj: {},
                dataKeyArray: [],
                logo: logo,
                background: background,
            };
        },
        provide() {
            return {
                // Make incomingData variable available to all child elements
                incomingData: computed(() => this.incomingDataObj)
            };
        },
        provide() {
            return {
                dataKeyArray: computed(() => this.dataKeyArray)
            };
        },
        // Spin up websocket client on app mount
        mounted: function () {
            let socket = new WebSocket("ws://localhost:18043/");

            socket.onopen = () => {
                let message = (new Date()).toISOString() + "|*|UI|*|Startup|*|UI now connected via Websocket";
                socket.send(message);
            };

            socket.onmessage = (event) => {
                // Vue data binding means we don't need any extra work to
                // update the UI. Anytime a variable is updated from here the UI will follow
                console.log("recieved data", event);
                let messageArray = event.data.toString().split("|*|");
                let timestamp = messageArray[0]; // First argument is timestamp 
                let dataKey = messageArray[1]; // second is the data key assocated with the incoming data
                let dataContent = JSON.parse(messageArray[2]); // Third is an array of objects holding data
                this.incomingDataObj[dataKey] = dataContent;
                console.log("this is our incomingdataObj", this.incomingDataObj);

                if (this.dataKeyArray.includes(dataKey) === false) {
                    this.dataKeyArray.push(dataKey);
                }
            };

            socket.onclose = (event) => {
                console.log("wesocket connection closed", event);
            };
        },
    }
</script>

<style scoped>
    .nav-bar {
        width: 100%; 
        background-image: url('~./assets/superalgos-header-background.png');
        display: flex; 
    }

    .logo {
        height: 50px;
    }

    .nav-btn {
        height: 100%;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        background-color: transparent;
    }

    .nav-btn:hover {
        font-size: 16px;
        color: white;
        background-color: #333;
    }

    .nav-btn:active {
        border-bottom: solid 2px white;
    }


</style>
  

