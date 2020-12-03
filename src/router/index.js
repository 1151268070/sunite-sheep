import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/tabbar/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      }
    ]
  },
  // 羊只收购模块
  {
    path: '/herdadmin',
    name: 'herdAdmin',
    component: () => import('../views/page/herdAdmin/herdAdmin')
  },
  {
    path: '/herdbatch',
    name: 'herdBatch',
    component: () => import('../views/page/herdAdmin/herdBatch')
  },
  {
    path: '/herdSheep',
    name: 'herdSheep',
    component: () => import('../views/page/herdAdmin/herdSheep')
  },
  // 运输管理
  {
    path: '/caradmin',
    name: 'carAdmin',
    component: () => import('../views/page/carAdmin/carAdmin')
  },
  {
    path: '/carbatch',
    name: 'carBatch',
    component: () => import('../views/page/carAdmin/carBatch')
  },
  {
    path: '/carsheep',
    name: 'carSheep',
    component: () => import('../views/page/carAdmin/carSheep')
  },
  // 羊只入栏
  {
    path: '/lairageadmin',
    name: 'lairageAdmin',
    component: () => import('../views/page/lairageAdmin/lairageAdmin')
  },
  {
    path: '/lairagebatch',
    name: 'lairageBatch',
    component: () => import('../views/page/lairageAdmin/lairageBatch')
  },
  {
    path: '/lairagesheep',
    name: 'lairageSheep',
    component: () => import('../views/page/lairageAdmin/lairageSheep')
  },
  // 羊只检疫
  {
    path: '/quarantineadmin',
    name: 'quarantineAdmin',
    component: () => import('../views/page/quarantineAdmin/quarantineAdmin')
  },
  {
    path: '/quarantinebatch',
    name: 'quarantineBatch',
    component: () => import('../views/page/quarantineAdmin/quarantineBatch')
  },
  {
    path: '/quarantinesheep',
    name:  'quarantineSheep',
    component: () => import('../views/page/quarantineAdmin/quarantineSheep')
  },
  // 屠宰管理
  {
    path: '/butcheradmin',
    name: 'butcherAdmin',
    component: () => import('../views/page/butcherAdmin/butcherAdmin')
  },
  {
    path: '/butcherbatch',
    name: 'butcherBatch',
    component: () => import('../views/page/butcherAdmin/butcherBatch')
  },
  {
    path: '/butchersheep',
    name: 'butcherSheep',
    component: () => import('../views/page/butcherAdmin/butcherSheep')
  },
  // 排酸管理
  {
    path: '/acidadmin',
    name: 'acidAdmin',
    component: () => import('../views/page/acidAdmin/acidAdmin')
  },
  {
    path: '/acidbatch',
    name: 'acidBatch',
    component: () => import('../views/page/acidAdmin/acidBatch')
  },
  {
    path: '/acidsheep',
    name: 'acidSheep',
    component: () => import('../views/page/acidAdmin/acidSheep')
  },
  // 胴体分割
  {
    path: '/carcassadmin',
    name: 'carcassAdmin',
    component: () => import('../views/page/carcassAdmin/carcassAdmin')
  },
  {
    path: '/carcassbatch',
    name: 'carcassBatch',
    component: () => import('../views/page/carcassAdmin/carcassBatch')
  },
  {
    path: '/carcasssheep',
    name: 'carcassSheep',
    component: () => import('../views/page/carcassAdmin/carcassSheep')
  },
  // 牧民管理
  {
    path: '/staffadmin',
    name: 'staffAdmin',
    component: () => import('../views/page/staffAdmin/staffAdmin')
  },
  // 冷库管理
  {
    path: '/coldadmin',
    name: 'coldAdmin',
    component: () => import('../views/page/coldAdmin/coldAdmin')
  },
];

const router = new VueRouter({
  routes
});

export default router
