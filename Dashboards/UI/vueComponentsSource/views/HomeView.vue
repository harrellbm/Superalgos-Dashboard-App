<template>
<h1>"these are our data keys"{{dataKeyArray}}</h1>
<li v-for="(value, name) in getGlobals">
  'this is the name: ' {{name}} 'this is the value: ' {{value}}
  <li>{{getGlobals}}</li>
</li>

  <br />
  <br />
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">Page Refresh Count : {{ data.test }}</div>
      <div class="col-4">Number of Working Clients : {{ data.running }}</div> 
      <div  class="col-4">URL :<input type="text" v-model="url"> </div> 
    </div>
  </div>
  <br />
  <br />
  <br />
  <div class="container-fluid">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>userProfile</th>
          <th>instance</th>
          <th>clientVersion</th>
          <th>requestsCount</th>
          <th>requestNextTestCaseCount</th>
          <th>lastSeen</th>
        </tr>
      </thead>
      <tbody>
        <!--TODO: set up accessing incoming data map by key-->
        <!--TODO: then set up recurive display of data-->
        <!--TODO: then set up collapsable object-->
        <!--TODO: then refactor to it's own SFC vue file-->
        <!--TODO: then set up menu bar to choose dashboard-->
        <tr v-for="value in incomingData" :key="value">
          <td>{{ value }}</td>
          <td>{{ value[1] }}</td>
          <td>{{ value[1] }}</td>
          <td>{{ value[1] }}</td>
          <td>{{ value[1] }}</td>
          <td>{{ value[1] }}</td>
          <td>{{ value[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import ExpandableTree from "../components/expandableTree.vue";
export default {
  components: { ExpandableTree },
  // Receive incoming data from parent app <ExpandableTree :label="label" :data=getGlobals></ExpandableTree>
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


