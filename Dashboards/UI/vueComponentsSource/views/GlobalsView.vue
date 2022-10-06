<template>
    <Tabs :tabList="tabList">
      <template v-slot:tabPanel-1> Content 1 </template>
      <template v-slot:tabPanel-2> Content 2 </template>
    </Tabs>
</template>

<script>
    import Tabs from "../components/Tabs.vue";
    export default {
        props: ["incomingData"],
        components: {
            Tabs,
        },
        data() {
            return {
                tabList: ["Globals", "Raw Data"],
            };
        },
    };
</script>