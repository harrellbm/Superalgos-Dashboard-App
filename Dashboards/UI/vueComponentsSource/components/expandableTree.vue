<template>
    <div class="tree-menu">
      <div>{{ label }}</div>
      <tree-menu 
        v-for="data in data" 
        :data="data.nodes" 
        :label="data.label"
      >
      </tree-menu>
    </div>
  </template>

  <script>
    export default { 
      props: [ 'label', 'data' ],
      name: 'tree-menu'
    }
  </script>