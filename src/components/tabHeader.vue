<template>
  <div class="header-fixed">
    <van-nav-bar
            :left-arrow="barData.isBack ? true: false"
            @click-left="onClickLeft"
            @click-right="onClickRight"
            style="background-color: #f8f8f8;"
            :title="barData.title">
      <template #right v-if="barData.rightBtn">
        <van-icon size="24" :name="barData.rightIcon ? barData.rightIcon :  'plus'" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: "tabHeader",
    props: [ 'barData' ],
    methods: {
      onClickLeft() {
        this.$emit('backBtn' );
      },
      onClickRight() {
        this.$emit('addBtn');
      }
    }
  }
</script>

<style scoped>
  .header-fixed {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
</style>
