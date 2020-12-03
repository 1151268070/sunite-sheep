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
    name: "quarantineAdmin",
    components: {
      TabHeader
    },
    data() {
      return {
        barData: {
          title: '检疫批次管理',
          isBack: true,
          rightBtn: false
        },
        cellList: [
          {
            id: 1,
            title: '羊只检疫批次管理',
            path: '/quarantinebatch'
          },
          {
            id: 2,
            title: '检疫羊只',
            path: '/'
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
