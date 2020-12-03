<template>
  <div class="tabbar">
    <van-tabbar route>
      <van-tabbar-item v-for="(item, i) in tabbarList" :icon="item.icon" :to="item.path" :key="i">
        {{item.name}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "tabbar",
    props:{
      tabbarList:Array
    },
    data() {
      return {
      }
    },
    methods: {
    },
  }
</script>

<style scoped>
  .tabbar{
    width:100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #f8f8f8;
  }
</style>
