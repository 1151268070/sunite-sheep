<template>
  <div class="home">
    <tab-header :bar-data="barData"></tab-header>
    <div class="margin-top-fixed">
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item, i) in 5" :key="i">{{item}}</van-swipe-item>
      </van-swipe>
      <div class="margin-top">
        <van-grid :column-num="3" square>
          <van-grid-item
                  v-for="(value, index ) in iconList"
                  :key="index"
                  :text="value.name"
                  @click="jump(value.path)">
            <template #icon>
              <img :src="value.icon" width="36px"/>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import TabHeader from '../../components/tabHeader';
export default {
  name: 'Home',
  components: {
    TabHeader
  },
  data() {
    return {
      barData: {
        title: '首页',
        isBack: false,
        rightBtn: false,
      },
      iconList: [
        {
          id: 1,
          name: '羊只收购',
          icon: require('../../assets/image/u88.svg'),
          path: '/herdadmin'
        },
        {
          id: 2,
          name: '运输信息',
          icon: require('../../assets/image/u100.png'),
          path: '/caradmin'
        },
        {
          id: 3,
          name: '羊只入栏',
          icon: require('../../assets/image/u104.png'),
          path: '/lairageadmin',
        },
        {
          id: 4,
          name: '羊只检疫',
          icon: require('../../assets/image/u49.png'),
          path: '/quarantineadmin',
        },
        {
          id: 5,
          name: '屠宰管理',
          icon: require('../../assets/image/u53.png'),
          path: '/butcheradmin',
        },
        {
          id: 6,
          name: '排酸入库',
          icon: require('../../assets/image/u57.png'),
          path: '/acidadmin'
        },
        {
          id: 7,
          name: '胴体分割',
          icon: require('../../assets/image/u62.png'),
          path: '/carcassadmin'
        },
        {
          id: 8,
          name: '分割仓储',
          icon: require('../../assets/image/u66.png'),
          path: ''
        },
        {
          id: 9,
          name: '肉丁加工',
          icon: require('../../assets/image/u70.png'),
          path: ''
        },
        {
          id: 10,
          name: '产品打包',
          icon: require('../../assets/image/u75.png'),
          path: '/'
        },
        {
          id: 11,
          name: '成品仓储',
          icon: require('../../assets/image/u92.png'),
          path: ''
        },
        {
          id: 12,
          name: '销售管理',
          icon: require('../../assets/image/u96.png'),
          path: ''
        },
        {
          id: 13,
          name: '损失管理',
          icon: require('../../assets/image/u108.png'),
          path: ''
        },
        {
          id: 14,
          name: '基础信息',
          icon: require('../../assets/image/u80.png'),
          path: '',
        },
        {
          id: 15,
          name: '牧民信息',
          icon: require('../../assets/image/u84.png'),
          path: '/staffadmin'
        },
        // {
        //   id: 2,
        //   name: '冷库管理',
        //   path: '/coldadmin'
        // },
        // {
        //   id: 3,
        //   name: '车辆管理',
        //   path: '/caradmin'
        // }
      ]
    }
  },
  methods: {
    jump(data) {
      this.$router.push({path: data}, ()=> {});
    }
  }
}
</script>
<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 200px;
    text-align: center;
    background-color: #39a9ed;
  }
  .margin-top {
    margin-top: 10px;
  }
</style>
