<template>
  <div>
    <tab-header :bar-data="barData"></tab-header>
    <div class="margin-top-fixed">
      <div id="bcid">
        <!--盛放扫描控件的<div></div> -->
        <div style="height:40%"></div>
      </div>

      <div class="cufixed" style="padding: 0px;">
        <van-row style="text-align: center; height: 100%; line-height: 50px; color: white">
          <van-col span="12" style="background-color: #07c160;" @click="scanPicture">从相册中选择</van-col>
          <van-col span="12" style="background-color: #ff976a;" @click="backBtn">取 消</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import TabHeader from "./tabHeader";
  let scan = null;
  let styles = {frameColor: "#2e5dea",scanbarColor: "#2e5dea",};
  var filter, item;
  export default {
    name: "scanQrItem",
    data() {
      return {
        barData: {
          title: '物品二维码扫描',
          isBack: false,
          rightBtn: false,
        },
        paths: '',
        show: false,
      }
    },
    components: {
      TabHeader
    },
    methods: {
      // H5调用扫描功能
      startRecognize () {
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid',filter, styles);
        scan.onmarked = onmarked;
        scan.start();
        function onmarked (type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break
          }
          result = result.replace(/\n/g, '');
          item = result;
          scan.close();
          //这里写扫码结束后 自己的逻辑
          that.$emit('getCode', item);
        }
      },
      scanPicture() {
        if (!window.plus) return;
        plus.gallery.pick(
          function(path) {
            // alert(path);
            plus.barcode.scan(
              path,
              function(type, result) {
                // alert("Scan success:(" + type + ")" + result);
                window.localStorage.codeUrl2 = result;
              },
              function(e) {
                console.log(e);
                window.localStorage.codeUrl2 = e;
                plus.nativeUI.alert("如果图片无法识别,请用扫码上传");
              }
            );
          },
          function(e) {
            alert("取消选择图片");
          },
          { filter: "image" }
        );
      },
      backBtn() {
        if (!window.plus) return;
        scan.close();
        this.$emit('setCancel', false);
      }
    },
    mounted() {
      this.startRecognize();
    },
  }
</script>

<style scoped>
  #bcid {
    width: 100%;
    height: 88vh;
    background: #000000;
  }
  .cufixed {
    width: 100%;
    height: 50px;
    background-color: white;
    position: fixed;
    bottom: 0vw;
    left: 0;
  }
</style>

