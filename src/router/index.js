import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('/@/page/home')
const Category = () => import('/@/page/category')
const Cart = () => import('/@/page/cart')
const Mine = () => import('/@/page/mine')
const Login = () => import('/@/page/login')
const Product = () => import('/@/page/product')

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
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product,
    },
  ],
})

export default router
