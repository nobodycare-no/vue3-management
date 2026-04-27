import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import Layout from '../views/Layout.vue'
import LoginInfo from '../views/LoginInfo/index.vue'
import {useLoginStore} from '../stores/loginStore'
import {useMenuStore} from '../stores/menuStore'
import work from './dynamicRouter.js'

let adminWorkRouteRegistered = false
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            requiresAuth: true,
            key: '首页'
          }
        },

        {
          path: '/build',
          name: 'build',
          component: ()=>import('../views/BuildManage/index.vue'),
          meta: {
            requiresAuth: true,
            key: '施工监控检测'
          }
        },

        {
          path: '/geological',
          name: 'geological',
          component: ()=>import('../views/GeologicalInfo/index.vue'),
          meta: {
            requiresAuth: true,
            key: '超前地质预报'
          }
        },

        {
          path: '/project',
          name: 'project',
          component: ()=>import('../views/ProjectInfo/index.beautified.vue'),
          // component: ()=>import('../views/ProjectInfo/index.vue'),
          meta: {
            requiresAuth: true,
            key: '项目基础信息'
          }
        },

        {
          path: '/system',
          name: 'system',
          component: () => import('../views/SystemManage/index.beautified.vue'),
          // component: ()=>import('../views/SystemManage/index.vue'),
          meta: {
            requiresAuth: true,
            key: '系统信息管理'
          }
        },

        {
          path: '/tunnel',
          name: 'tunnel',
          component: ()=>import('../views/TunnelInfo/index.beautified.vue'),
          // component: ()=>import('../views/TunnelInfo/index.vue'),
          meta: {
            requiresAuth: true,
            key: '隧道设计信息'
          }
        },

        {
          path: '/userCenter',
          name: 'userCenter',
          component: () => import('../views/UserCenter/index.vue'),
          meta: {
            requiresAuth: true,
            key: '个人中心'
          }
        },
        {
          path: '/plan',
          name: 'plan',
          component: () => import('../views/BuildManage/PlanTest/index.vue'),
          meta: {
            requiresAuth: true,
            key: '检测计划'
          }
        },
        {
          path: '/section',
          name: 'section',
          component: () => import('../views/BuildManage/SectionTest/index.vue'),
          meta: {
            requiresAuth: true,
            key: '切面检测'
          }
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: LoginInfo
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFound/index.vue')
    },
    {
      path: '/pdf/:id',
      name: 'pdf',
      component: () => import('../views/TunnelInfo/PDFViewer/index.vue')
    }
  ],
})

router.beforeEach((to, from) => {
  const loginStore = useLoginStore()

  // 动态路由必须在本次导航完成前注册，否则直接打开 /work 会先匹配不到子路由 → 白屏
  if (
    loginStore.token &&
    loginStore.permission === 'admin' &&
    !adminWorkRouteRegistered &&
    to.path !== '/login'
  ) {
    router.addRoute('layout', work)
    adminWorkRouteRegistered = true
    return { ...to, replace: true }
  }

  if (to.meta.requiresAuth && !loginStore.token) {
    return { path: '/login' }
  }
})

router.afterEach((to, from) => {
  const menuStore = useMenuStore()
  menuStore.breadcrumb = to.meta.key
  menuStore.active = to.path
})

export default router
