import { createRouter, createWebHashHistory } from "vue-router";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: { index: 1 },
      component: () => import(/* webpackChunkName: "home" */ '/@/page/home')
    }
  ]
})

export default router

