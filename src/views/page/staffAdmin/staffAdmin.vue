<template>
  <div>
    <tab-header :bar-data="barData" @backBtn="backBtn" @addBtn="addBtn"></tab-header>
  </div>
</template>

<script>
  import TabHeader from '../../../components/tabHeader';
  export default {
    name: "staffAdmin",
    components: {
      TabHeader
    },
    data() {
      return {
        barData: {
          title: '牧民信息列表',
          isBack: true,
          rightBtn: true,
        }
      }
    },
    methods: {
      backBtn() {
        this.$router.back();
      },
      addBtn() {

      }
    }
  }
</script>

<style scoped>

</style>
