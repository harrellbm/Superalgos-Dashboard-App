<template>
    <div class="expandable-tree" >
      <div :style="indent" @click="toggleChildren">
        <!-- Check if value is an array, because otherwise we do not have a proptery name to display -->
        <!-- Note: there may be situations where the first recursive object does not have a name value to display in this case. No name value is passed in as a prop which will cause the first render to skip and continue recursion through the provided object -->
        <span>{{ name }}</span>
        <!-- if value is not an object render it now since recursion stops here-->
        <span v-if="isObject(value) === false"> : {{value}}</span>
      </div>
      <expandable-tree 
        v-if="isObject(value) === true && this.showChildren"
        v-for="(data, name) in value" 
        :value="data" 
        :name="name"
        :depth="depth + 1"
      >
      </expandable-tree>
    </div>
  </template>

  <script>
    export default { 
      props: [ 'value', 'name', 'depth' ],
      name: 'expandable-tree',
      data() {
        return { 
          showChildren: false,
          objString: 'object'
         }
      },
      computed: {
        indent() {
          return { transform: `translate(${this.depth * 50}px)` }
        }
      },
      methods: {
        toggleChildren() {
          this.showChildren = !this.showChildren;
        },
        isObject(value) {
          return typeof value === 'object'
        }
      }
    }
  </script>