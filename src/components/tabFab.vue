<template>
  <div>
    <vue-fab :mainBtnColor="mainBtnColor" size="big" @clickMainBtn="clickMainBtn">
      <fab-item
              v-for="(item, i) in menu"
              :idx="i"
              :title="item.title"
              :color="item.color"
              :icon="item.icon"
              :key="i"
              @clickItem="clickItem" >
      </fab-item>
    </vue-fab>
  </div>
</template>

<script>
  export default {
    name: "tabFab",
    data() {
      return {
        menu: [
          {
            icon: 'add',
            title: '添加',
            color: '#ff9900'
          },
          {
            icon: 'delete',
            title: '批量删除',
            color: '#a020f0'
          }
        ],
        mainBtnColor: '#FF0099'
      }
    },
    methods: {
      clickItem: function (idx) {
        let item = JSON.parse(JSON.stringify(idx));
        if(item.idx == 0) {
          this.$emit('addBtn');
        } else {
          this.$emit('CheckAllDel');
        }
      },
      clickMainBtn: function () {
        console.log('clickMainBtn')
      }
    }
  }
</script>

<style scoped>
</style>
