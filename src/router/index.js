import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('/@/page/home')
const Category = () => import('/@/page/category')
const Cart = () => import('/@/page/cart')
const Mine = () => import('/@/page/mine')
const Setting = () => import('/@/page/mine/setting.vue')
const Login = () => import('/@/page/login')
const Product = () => import('/@/page/product')
const Orders = () => import('/@/page/orders')
const MineOrder = () => import('/@/page/orders/mineOrder.vue')
const DetailOrder = () => import('/@/page/orders/detailOrder.vue')
const Address = () => import('/@/page/address')
const AddressEdit = () => import('/@/page/address/addressEdit.vue')

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
    {
      path: '/create-order',
      name: 'create-order',
      component: Orders,
    },
    {
      path: '/mine-order',
      name: 'mine-order',
      component: MineOrder,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
    {
      path: '/detail-order',
      name: 'detail-order',
      component: DetailOrder,
    },
    {
      path: '/address',
      name: 'address',
      component: Address,
    },
    {
      path: '/address-edit',
      name: 'address-edit',
      component: AddressEdit,
    },
  ],
})

export default router
