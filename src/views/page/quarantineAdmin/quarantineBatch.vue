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
                              检疫批次编号：{{item.batch}}
                            </van-col>
                            <van-col span="12">
                              检疫人员：{{item.number}}
                            </van-col>
                            <van-col span="12">
                              检疫日期：{{item.buyTime.split(' ')[0]}}
                            </van-col>
                            <van-col span="12">
                              检疫项目：{{item.number}}
                            </van-col>
                            <van-col span="12">
                              检疫数量：{{item.weight}}
                            </van-col>
                            <van-col span="12">
                              合格数量：{{item.position}}
                            </van-col>
                            <van-col span="12">
                              不合格数量：{{item.position}}
                            </van-col>
                            <van-col span="12">
                              来源栏舍：{{item.position}}
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
                      v-model="batch"
                      name="batch"
                      label="检疫批次编号 " :disabled="showEdit"
                      size="large" :rules="[{ required: true, message: '请输入批次编号' }]"></van-field>
              <van-field v-model="number"
                         name="number"
                         label="检疫人员"
                         size="large" :rules="[{ required: true, message: '请输入入栏数量' }]"></van-field>
              <van-field
                      readonly
                      clickable
                      name="calendar"
                      :value="buyTime.split(' ')[0]"
                      label="检疫日期"
                      placeholder="点击选择日期"
                      @click="showTime = true"
              />
              <van-field v-model="weight"
                         name="weight"
                         label="检疫项目"
                         size="large" :rules="[{ required: true, message: '请输入入栏负责人' }]"></van-field>
              <van-field v-model="weight"
                         name="weight"
                         label="检疫数量" type="number" :disabled="showEdit"
                         size="large" :rules="[{ required: true, message: '请输入入栏负责人' }]"></van-field>
              <van-field v-model="weight"
                         name="weight"
                         label="合格数量" type="number" :disabled="showEdit"
                         size="large" :rules="[{ required: true, message: '请输入入栏负责人' }]"></van-field>
              <van-field v-model="weight"
                         name="weight"
                         label="不合格数量" type="number" :disabled="showEdit"
                         size="large" :rules="[{ required: true, message: '请输入入栏负责人' }]"></van-field>
              <van-field v-model="weight"
                         name="weight"
                         label="入栏批次编号"
                         size="large" :rules="[{ required: true, message: '请输入入栏负责人' }]"></van-field>
              <van-field v-model="weight"
                         name="weight"
                         label="来源栏舍"
                         size="large" :rules="[{ required: true, message: '请输入入栏负责人' }]"></van-field>
              <van-field v-model="status1"
                         readonly
                         name="position"
                         label="本批次状态"
                         @click="showStatus = true"
                         size="large" ></van-field>
              <van-button type="danger" round  block native-type="submit">提交</van-button>
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
    <van-popup v-model="showStatus" round position="bottom">
      <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showStatus = false"
              @confirm="onStatus"></van-picker>
    </van-popup>
  </div>
</template>

<script>
  import TabHeader from '../../../components/tabHeader';
  import tabFab from '../../../components/tabFab';
  import BottomDel from '../../../components/bottomDel';
  import scanQrItem from "../../../components/scanQrItem";
  export default {
    name: "quarantineBatch",
    components: {
      TabHeader,
      tabFab,
      BottomDel,
      scanQrItem
    },
    data() {
      return {
        barData: {
          title: '检疫批次管理',
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
            buyTime: '2020-12-01 16:37:25',
            number: 20,
            weight: 500,
            position: '杭州市',
            score: 'xx牧场',
            name: '张三',
            buyer: '李四',
            renNum: 2
          },
          {
            id: 2,
            batch: '515121',
            buyTime: '2020-12-01 16:37:25',
            number: 100,
            weight: 400,
            position: '杭州市',
            score: 'xx牧场',
            name: '张三',
            buyer: '李四',
            renNum: 3
          },
          {
            id: 3,
            batch: '515121',
            buyTime: '2020-12-01 16:37:25',
            number: 20,
            weight: 40,
            position: '杭州市',
            score: 'xx牧场',
            name: '张三',
            buyer: '李四',
            renNum: 2
          },
          {
            id: 4,
            batch: '515121',
            buyTime: '2020-12-01 16:37:25',
            number: 20,
            weight: 40,
            position: '杭州市',
            score: 'xx牧场',
            name: '张三',
            buyer: '李四',
            renNum: 2
          },
          {
            id: 5,
            batch: '515121',
            buyTime: '2020-12-01 16:37:25',
            number: 20,
            weight: 40,
            position: '杭州市',
            score: 'xx牧场',
            name: '张三',
            buyer: '李四',
            renNum: 2
          },
        ],
        showCheck: false, //隐藏复选框
        showFab: true, //隐藏悬浮按钮fab
        showPopup: false, //新增编辑！
        // 新增编辑页面头部
        addData: {
          title: '新建检疫批次',
          isBack: false,
          rightBtn: true,
          rightIcon: 'cross'
        },
        // 新增/编辑所需要的参数
        id: '',
        batch: '', // 收购批次
        buyTime: '', // 收购时间
        number: '', // 收购羊只数量
        weight: '', //批次总重
        position: '', //收购地点
        score: '', //来源牧场
        name: '', //牧民姓名
        buyer: '', //收购人姓名
        renNum: '', //收购人数
        // 编辑时禁用输入框
        showEdit: false,
        // 事件选择器开关,
        showTime: false,
        // 最大最小时间
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2030, 0, 31),
        // 扫码显示
        showScan: false,
        // 入栏批次状态
        showStatus: false,
        status1: '',
        status: '',
        columns: [{id: 0, text: '待开启'}, {id: 1, text: '进行中'}, {id: 2, text: '完结'}]
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
        this.buyTime = this.formatDate(date);
      },
      // 编辑
      edit(item) {
        this.showPopup = true;
        this.showFab = false;
        this.showEdit = true;
        this.id = item.id;
        this.batch = item.batch;
        this.buyTime = item.buyTime;
        this.number = item.number;
        this.weight = item.weight;
        this.position = item.position;
        this.score = item.score;
        this.name = item.name;
        this.buyer = item.buyer;
        this.renNum = item.renNum;
      },
      // 新增/编辑提交
      onSubmit() {
        let list = {
          batch: this.batch,
          buyTime: this.buyTime,
          number: this.number,
          weight: this.weight,
          position: this.position,
          score: this.score,
          name: this.name,
          buyer: this.buyer,
          renNum: this.renNum,
        };
        if(this.showEdit) {
          list.id = this.id;
          // console.log(list);
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
        this.buyTime = '';
        this.number = '';
        this.weight = '';
        this.position = '';
        this.score = '';
        this.name = '';
        this.buyer = '';
        this.renNum = '';
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
      // 选择入栏批次状态
      onStatus(data) {
        this.showStatus = false;
        this.status = data.id;
        this.status1 = data.text;
      }
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

