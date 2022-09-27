<template>
    <div class="expandable-tree">
      <div>{{ name }}</div>

      <expandable-tree 
        v-if="typeof value === 'object'"
        v-for="(data, name) in value" 
        :value=data 
        :name=name
      >
      </expandable-tree>
      <div v-else="value !== undefined || value !== null">{{value}}</div>
    </div>
  </template>

  <script>
    export default { 
      props: [ 'value', 'name' ],
      name: 'expandable-tree'
    }
  </script>