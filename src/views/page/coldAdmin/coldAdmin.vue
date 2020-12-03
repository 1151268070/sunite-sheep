<template>
  <div>
    <tab-header :bar-data="barData" @backBtn="backBtn" @addBtn="addBtn"></tab-header>
  </div>
</template>

<script>
  import TabHeader from '../../../components/tabHeader';
  export default {
    name: "coldAdmin",
    components: {
      TabHeader
    },
    data() {
      return {
        barData: {
          title: '冷库信息列表',
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
