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
    name: "herdAdmin",
    components: {
      TabHeader
    },
    data() {
      return {
        barData: {
          title: '羊只收购批次管理',
          isBack: true,
          rightBtn: false
        },
        cellList: [
          {
            id: 1,
            title: '羊只收购批次管理',
            path: '/herdbatch'
          },
          {
            id: 2,
            title: '羊只收购',
            path: '/herdsheep'
          }
        ]
      }
    },
    methods: {
      backBtn() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>

</style>
