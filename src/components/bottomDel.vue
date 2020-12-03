<template>
  <div class="box-content">
    <van-row>
      <van-col span="6">
        <van-button  block type="primary" @click="checkAll">全选</van-button>
      </van-col>
      <van-col offset="6" span="6">
        <van-button  block type="danger" @click="checkDel">删除</van-button>
      </van-col>
      <van-col span="6">
        <van-button  block type="warning" @click="cancel">取消</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "bottomDel",
    methods: {
      checkAll() {
        this.$emit('checkAll');
      },
      cancel() {
        this.$emit('checkCancel');
      },
      checkDel() {
        this.$emit('delConfirm');
      }
    }
  }
</script>

<style scoped>
  .box-content {
    width: 100%;
    height: 50px;
    z-index: 99;
    position: fixed;
    bottom: -1vh;
    left: 0;
    background-color: #f7f7f7;
  }
</style>
