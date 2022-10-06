<template>
    <Tabs :tabList="tabList">
      <template v-slot:tabPanel-1>   
        <div v-for="(objs) in getGlobals">
            <ExpandableTree v-for="(value, name) in objs" :value="value" :name="name" :depth="0"></ExpandableTree>
        </div> 
        </template>
      <template v-slot:tabPanel-2> Content 2 </template>
    </Tabs>
</template>

<script>
    import ExpandableTree from "../components/expandableTree.vue";
    import Tabs from "../components/Tabs.vue";
    export default {
        props: ["incomingData"],
        components: { Tabs, ExpandableTree },
        data() {
            return {
                tabList: ["Globals", "Raw Data"],
                dataKey: 'Platform-Globals',
                dataObjects: [],
            };
        },
        computed: {
            getGlobals () {
                this.dataObjects = []
                // If we find the right key, proceed to call for expected data objects
                if (this.dataKey in this.incomingData) {
                // Grab data Objects from the array assocated with the data Key
                // For example: Plaform-Globals key holds an array of globals objects
                    for(let dataObject of this.incomingData[this.dataKey]) {
                        this.dataObjects.push(dataObject)
                    }
                }
                // Return all received data objects
                return this.dataObjects
            }
        }
    };
</script>