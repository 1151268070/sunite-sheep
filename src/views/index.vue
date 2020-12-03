<template>
  <div>
    <router-view></router-view>
    <tab-bar :tabbarList="tabbarList"></tab-bar>
  </div>
</template>

<script>
  import TabBar from '../components/tabbar';
  export default {
    name: "index",
    components: {
      TabBar
    },
    data() {
      return {
        tabbarList:[
          {name:"首页",path:"/home", icon: 'home-o'},
          {name:"设置",path:"/setting", icon: 'setting-o'},
          {name:"我的",path:"/mine", icon: 'friends-o'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
