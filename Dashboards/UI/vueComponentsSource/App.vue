<template>
<router-view></router-view>
<h1>'this is loaded content'{{content}}</h1>
</template>

<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    mounted: function(){
        let socket = new WebSocket('ws://localhost:18043/');
        socket.onopen = () => {
            let message = (new Date()).toISOString() + '|*|UI|*|Startup|*|UI now connected via Websocket'
            socket.send(message)
        }
        socket.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
        });
        socket.onmessage = (event) => {
            // Vue data binding means we don't need any extra work to
            // update the UI. Anytime a variable is update from here the UI will follow
                console.log('recieved data', event)
            this.content = event.data;
        }
        socket.onclose = (event) => {
            console.log('wesocket connection closed', event)
        }
    }
}
</script>


