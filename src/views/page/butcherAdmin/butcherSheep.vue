<template>
  <div>
    <tab-header :bar-data="barData" @backBtn="backBtn"></tab-header>
    <div class="margin-top-fixed">
      <div class="cu-fixed">
        <van-row gutter="20" type="flex" class="box-row">
          <van-col span="21">
            <van-search
                    v-model="keyword"
                    show-action
                    placeholder="请输入耳标号"
                    @blur="selectSon($event)"
                    @search="onSearch">
              <template #action>
                <van-button type="primary" size="small" @click="onSearch">搜索</van-button>
              </template>
            </van-search>
          </van-col>
          <van-col span="3">
            <van-icon name="scan" size="28" @click="scanQr"></van-icon>
          </van-col>
        </van-row>
      </div>
      <div class="margin-top-max">
        <div>
          <van-checkbox-group v-model="result" ref="checkboxGroup">
            <div style="margin-bottom: 10px" v-for="(item, i) in list" :key="item.id">
              <van-row gutter="10" type="flex" class="box-row">
                <van-col  :span="checkCol" v-show="showCheck">
                  <van-checkbox :name="item.id"></van-checkbox>
                </van-col>
                <van-col :span="checkRow">
                  <van-swipe-cell>
                    <van-cell :title="'序号:' + item.id">
                      <template #label>
                        <div class="widthSize">
                          <van-row class="text-size" gutter="20">
                            <van-col span="12">
                              羊只编号：{{item.sheepId}}
                            </van-col>
                            <van-col span="12">
                              羊只重量：{{item.er_id}}
                            </van-col>
                            <van-col span="12">
                              屠宰批次号：{{item.batch}}
                            </van-col>
                            <van-col span="12">
                              栏舍编号：{{item.weight}}
                            </van-col>
                            <van-col span="12">
                              收购批次编号：{{item.opeUser}}
                            </van-col>
                          </van-row>
                        </div>
                      </template>
                    </van-cell>
                    <template #right>
                      <van-button square type="primary" class="delete-button" text="编辑" @click="edit(item)"/>
                      <van-button square type="danger" class="delete-button" text="删除" @click="del(item, i)"/>
                    </template>
                  </van-swipe-cell>
                </van-col>
              </van-row>
            </div>
          </van-checkbox-group>
        </div>
      </div>
    </div>
    <tab-fab v-show="showFab"  @addBtn="addBtn" @CheckAllDel="CheckAllDel"></tab-fab>
    <bottom-del v-show="showCheck" :class="showCheck ? 'del-animation' : ''" @checkAll="checkAll" @delConfirm="delConfirm" @checkCancel="checkCancel"></bottom-del>
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '100%', width: '100%' }">
      <div class="popup">
        <tab-header :bar-data="addData" @addBtn="addCancel"></tab-header>
        <div class="margin-top-fixed">
          <div class="padding">
            <van-form @submit="onSubmit">
              <van-field
                      v-model="sheepId"
                      name="batch"
                      label="羊只编号"
                      size="large" :rules="[{ required: true, message: '请输入批次编号' }]"></van-field>
              <van-field
                      label="屠宰批次编号"
                      v-model="batch"
                      placeholder="选择屠宰批次编号"
                      @click="showBatch = true"
                      :disabled="showEdit"
                      :rules="[{ required: true, message: '请选择批次编号' }]"
                      size>
              </van-field>
              <van-field v-model="er_id" name="er_id" label="羊只重量"></van-field>
              <van-field v-model="weight"
                         name="weight"
                         label="栏舍编号" type="number" :disabled="showEdit"
                         size="large" :rules="[{ required: true, message: '请输入批次总重' }]"></van-field>
              <van-field v-model="opeUser"
                         name="opeUser"
                         label="收购批次编号" :disabled="showEdit"
                         size="large" :rules="[{ required: true, message: '请输入收购地点' }]"></van-field>
              <van-button type="danger" round  block native-type="submit">保存</van-button>
            </van-form>
          </div>
        </div>
      </div>
    </van-popup>
    <van-calendar v-model="showTime" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate"></van-calendar>
    <div v-if="showScan">
      <van-popup v-model="showScan" position="bottom" :style="{ height: '100%' }" >
        <scan-qr-item @getCode="getCode" @setCancel="scanCancel"></scan-qr-item>
      </van-popup>
    </div>
    <van-popup v-model="showBatch" round position="bottom">
      <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showBatch = false"
              @confirm="onBatch"></van-picker>
    </van-popup>
  </div>
</template>

<script>
  import TabHeader from '../../../components/tabHeader';
  import tabFab from '../../../components/tabFab';
  import BottomDel from '../../../components/bottomDel';
  import scanQrItem from "../../../components/scanQrItem";
  import wv from '../../../utils/wv';
  export default {
    name: "quarantineSheep",
    components: {
      TabHeader,
      tabFab,
      BottomDel,
      scanQrItem
    },
    data() {
      return {
        barData: {
          title: '屠宰羊只',
          isBack: true,
          rightBtn: false
        },
        keyword: '',
        keySon: '',
        pageNum: 1,
        result: [], // 批量苏选择
        list: [
          {
            id: 1,
            batch: '515121',
            opeTime: '2020-12-01 16:37:25',
            weight: 500,
            er_id: '25482155236',
            sheepId: '215534',
            opeUser: '张三',
          },
          {
            id: 2,
            batch: '515121',
            opeTime: '2020-12-01 16:37:25',
            weight: 500,
            er_id: '25482155236',
            sheepId: '215534',
            opeUser: '张三',
          },
          {
            id: 3,
            batch: '515121',
            opeTime: '2020-12-01 16:37:25',
            weight: 500,
            er_id: '25482155236',
            sheepId: '215534',
            opeUser: '张三',
          },
          {
            id: 4,
            batch: '515121',
            opeTime: '2020-12-01 16:37:25',
            weight: 500,
            er_id: '25482155236',
            sheepId: '215534',
            opeUser: '张三',
          },
          {
            id: 5,
            batch: '515121',
            opeTime: '2020-12-01 16:37:25',
            weight: 500,
            er_id: '25482155236',
            sheepId: '215534',
            opeUser: '张三',
          },
        ],
        showCheck: false, //隐藏复选框
        showFab: true, //隐藏悬浮按钮fab
        showPopup: false, //新增编辑！
        // 新增编辑页面头部
        addData: {
          title: '新建屠宰羊只',
          isBack: false,
          rightBtn: true,
          rightIcon: 'cross'
        },
        // 新增/编辑所需要的参数
        id: '',
        batch: '', // 羊只批次
        sheepId: '', // 羊只编号
        opeTime: '', //录入时间
        er_id: '', // 耳标号
        weight: '', //羊只重量
        opeUser: '', //录入人员
        showBatch: false, //羊只批次编号选择
        // 编辑时禁用输入框
        showEdit: false,
        // 事件选择器开关,
        showTime: false,
        // 最大最小时间
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2030, 0, 31),
        // 扫码显示
        showScan: false,
        columns: ['2546284', '62151212', '1251323']
      }
    },
    computed: {
      checkCol() {
        return this.showCheck ? 2 : 0;
      },
      checkRow() {
        return this.showCheck ? 22 : 24;
      }
    },
    methods: {
      connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
          callback(WebViewJavascriptBridge);
        } else {
          document.addEventListener(
            "WebViewJavascriptBridgeReady",
            function () {
              callback(WebViewJavascriptBridge);
            },
            false
          );
        }
      },
      selectSon(e) {
        let key = e.target.value;
        if (key != this.keySon) {
          this.list = [];
          this.pageNum = 1;
        }
        this.keySon = key;
      },
      backBtn() {
        this.$router.back();
      },
      // 悬浮按钮添加新数据
      addBtn() {
        this.showPopup = true;
        this.showFab = false;
        this.showEdit = false;
      },
      // 悬浮按钮删除
      CheckAllDel() {
        this.showCheck = true;
        this.showFab = false;
      },
      // 组件全选
      checkAll() {
        this.$refs.checkboxGroup.toggleAll(true);
      },
      // 组件取消
      checkCancel() {
        this.showCheck = false;
        this.showFab = true;
      },
      // 组件删除数据
      delConfirm() {
        console.log(this.result);
      },
      onSearch() {},
      // 删除一个
      del(item, i) {
        this.list.splice(i, 1);
      },
      // 新增/编辑取消
      addCancel() {
        this.showFab = true;
        this.showPopup = false;
      },
      // 时间日期初始化
      formatDate(date) {
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let seconds =date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hours}:${minutes}:${seconds}`;
      },
      // 时间日期选择
      onConfirm(date) {
        this.showTime = false;
        this.opeTime = this.formatDate(date);
      },
      // 编辑
      edit(item) {
        this.showPopup = true;
        this.showFab = false;
        this.showEdit = true;
        this.id = item.id;
        this.batch = item.batch;
        this.opeTime = item.opeTime;
        this.er_id = item.er_id;
        this.weight = item.weight;
        this.opeUser = item.opeUser;
        this.sheepId = item.sheepId;
      },
      // 新增/编辑提交
      onSubmit() {
        let list = {
          batch: this.batch,
          opeTime: this.opeTime,
          weight: this.weight,
          sheepId: this.sheepId,
          opeUser: this.opeUser,
          er_id: this.er_id
        };
        if(this.showEdit) {
          list.id = this.id;
          this.list.forEach((item, index) => {
            if(item.id == this.id) {
              this.list.splice(index, 1, list);
            }
          })
        } else {
          let num = this.list.length;
          list.id = num+1;
          this.list.push(list);
        }
        this.batch = '';
        this.opeTime = '';
        this.er_id = '';
        this.weight = '';
        this.opeUser = '';
        this.sheepId = '';
        this.showPopup = false;
        this.showFab = true;
        this.showEdit = false;
      },
      // 扫码开启
      scanQr() {
        this.showScan = true;
        this.showFab = false;
      },
      // 扫码拿到数据
      getCode(data) {
        this.keyword = data;
        this.showScan = false;
        this.showFab = true;
      },
      // 扫码取消
      scanCancel() {
        this.showScan = false;
        this.showFab = true;
      },
      // 选择批次
      onBatch(data) {
        this.showBatch = false;
        this.batch = data;
      }
    },
    mounted() {
      wv.regWv((data) => {
        this.er_id = data;
      })
    }
  }
</script>

<style scoped>
  .cu-fixed {
    width: 100%;
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 99;
  }
  .margin-top-max {
    margin-top: 108px;
    padding: 10px;
  }
  .box-row {
    background-color: white;
    align-items: center;
  }
  @keyframes del-start
  {
    from {bottom: -4vh;}
    to {bottom: -1vh;}
  }
  .del-animation {
    animation: del-start 1s;
  }
  .widthSize {
    width: 100%;
  }
  .delete-button {
    height: 100%;
  }
  .popup {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
  }
  .padding {
    padding: 20px;
  }
</style>


