import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('/@/page/home')
const Category = () => import('/@/page/category')
const Login = () => import('/@/page/login')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      meta: { index: 1 },
      component: Home,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

export default router
