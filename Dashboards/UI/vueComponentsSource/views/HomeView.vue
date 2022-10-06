<template>
  <div class="dashboard-window">
    <div v-for="(objs) in getGlobals">
      <ExpandableTree v-for="(value, name) in objs" :value="value" :name="name" :depth="0"></ExpandableTree>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ExpandableTree from "../components/expandableTree.vue";
export default {
  components: { ExpandableTree },
  // Receive incoming data from parent app 
  props: ["incomingData"],

  // Check to see if key is defined if so get all the data associated with it and assign it to data variable 
  data () {
    return {
      dataKey: 'Platform-Globals',
      dataObjects: [],
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
<style scoped>
  .dashboard-window {
    background: #f1f1f1
  }
  
  .test {
    color: red;
    border-style: solid;
    border-width: 1px;
    border-color: blue;
    border-radius: 5px;
  }
</style>

