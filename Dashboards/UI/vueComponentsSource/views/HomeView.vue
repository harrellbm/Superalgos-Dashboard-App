<template>
  <h1>"these are our data keys"{{dataKeyArray}}</h1>
  <br />
  <ExpandableTree v-for="(value) in getGlobals" v-bind:value=value :depth="-1"></ExpandableTree>
  <br />
        <!--TODO: style expandable tree element -->
        <!--TODO: then set up menu bar to choose dashboard-->
</template>

<script>
import { ref } from "vue";
import ExpandableTree from "../components/expandableTree.vue";
export default {
  components: { ExpandableTree },
  // Receive incoming data from parent app 
  props: ["incomingData"],
  // Make global data variables accessible 
  inject: ["dataKeyArray"],

  // Check to see if key is defined if so get all the data associated with it and assign it to data variable 
  data () {
    return {
      dataKey: 'Platform-Globals',
      dataObjects: [],
      label: "", 
    }
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
  },
  methods: {

  },
  setup() {
        let url = ref("http://99.81.83.180:31248/Stats/Machine Learning");
        let data = ref("");
        let i = 0;
        let time = 5000;
        let load = ref(true);
        return {
            data,
            load,
            url
        };
    },
    
};
</script>


