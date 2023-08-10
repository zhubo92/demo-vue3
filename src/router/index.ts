import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 配置路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/report',
  },
  {
    name: 'punch',
    path: '/punch',
    redirect: '/punch/ActivityList',
    children: [
      {
        name: 'ActivityList',
        path: '/punch/ActivityList',
        component: () => import('@/views/punch/ActivityList.vue'),
      },
    ],
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/demo/TestPage.vue'),
  },
  {
    name: 'report',
    path: '/report',
    component: () => import('@/views/report/EvaluationReport.vue'),
    meta: {
      title: '思维芯测评',
    },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  console.log('to:', to.path)
  console.log('from:', from.path)
  document.title = to.meta.title as string
})

export default router
