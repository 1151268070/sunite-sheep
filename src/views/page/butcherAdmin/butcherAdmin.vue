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
    name: "butcherAdmin",
    components: {
      TabHeader
    },
    data() {
      return {
        barData: {
          title: '屠宰管理',
          isBack: true,
          rightBtn: false
        },
        cellList: [
          {
            id: 1,
            title: '屠宰批次管理',
            path: '/butcherbatch'
          },
          {
            id: 2,
            title: '屠宰羊只管理',
            path: '/butchersheep'
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

