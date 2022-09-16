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
        let connection = new WebSocket('ws://localhost:18043/');
        connection.onopen = () => {
            connection.send('UI|*|Startup|*|UI now connected via Websocket')
        }
        connection.onmessage = (event) => {
            // Vue data binding means we don't need any extra work to
            // update the UI. Anytime a variable is update from here the UI will follow
                console.log('recieved data', event)
            this.content = event.data;
        }
    }
}
</script>


