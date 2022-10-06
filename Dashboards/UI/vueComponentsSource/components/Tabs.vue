<template>
  <div
    class="list-none bg-blue-900 bg-opacity-30 p-1.5 rounded-lg text-center overflow-auto whitespace-nowrap"
    :class="{
      flex: variant === 'horizontal',
    }"
  >
    <ul
      class="tab-container-vertical"
      :class="{
        flex: variant === 'vertical',
      }"
    >
      <li v-for="(tab, index) in tabList" :key="index">
        <label :class="tab-button" :for="`${_uid}${index}`" v-text="tab" />
        <input style="display:none"
          :id="`${_uid}${index}`"
          type="radio"
          :name="`${_uid}-tab`"
          :value="index + 1"
          v-model="activeTab"
        />
      </li>
    </ul>

    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index + 1 === activeTab">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: () => "vertical",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.tab-container-vertical {
  list-style: none;
  background-color: grey;
  justify-content: space-around;
  padding: 0px;
}

.tab-button{
  cursor: pointer;
}

</style>
