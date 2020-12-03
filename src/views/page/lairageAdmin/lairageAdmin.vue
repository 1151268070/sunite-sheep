<template>
  <div>
    <tab-header :bar-data="barData" @backBtn="backBtn"></tab-header>
    <div class="margin-top-fixed">
      <van-cell-group>
        <template v-for="item in cellList">
          <van-cell :key="item.id" :title="item.title" is-link :to="item.path" size="large"></van-cell>
        </template>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import TabHeader from '../../../components/tabHeader';
  export default {
    name: "lairageAdmin",
    components: {
      TabHeader
    },
    data() {
      return {
        barData: {
          title: '入栏信息',
          isBack: true,
          rightBtn: false
        },
        cellList: [
          {
            id: 1,
            title: '入栏批次管理',
            path: '/lairagebatch'
          },
          {
            id: 2,
            title: '羊只入栏',
            path: '/lairagesheep'
          }
        ]
      }
    },
    methods: {
      backBtn() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped>

</style>
