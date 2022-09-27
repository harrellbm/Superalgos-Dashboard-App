<template>
    <div class="expandable-tree">
      <div :style="indent">{{ name }} <span v-if="typeof value === 'string'"> :{{value}}</span></div>
      <expandable-tree 
        v-if="typeof value === 'object'"
        v-for="(data, name) in value" 
        :value=data 
        :name=name
        :depth="depth + 1"
      >
      </expandable-tree>
    </div>
  </template>

  <script>
    export default { 
      props: [ 'value', 'name', 'depth' ],
      name: 'expandable-tree',
      computed: {
        indent() {
          return { transform: `translate(${this.depth * 50}px)` }
        }
      }
    }
  </script>