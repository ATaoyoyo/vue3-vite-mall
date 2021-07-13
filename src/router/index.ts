import { createRouter, createWebHashHistory } from 'vue-router'

// const Home = () => import('/@/page/home')
import Home from '../page/home'
import Category from '../page/category'
import Cart from '../page/cart'
import Mine from '../page/mine'
import Setting from '../page/mine/setting.vue'
import Login from '../page/login'
import Product from '../page/product/productList.vue'
import ProductList from '../page/mine'
import Orders from '../page/orders'
import MineOrder from '../page/orders/mineOrder.vue'
import DetailOrder from '../page/orders/detailOrder.vue'
import Address from '../page/address'
import AddressEdit from '../page/address/addressEdit.vue'


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
      path: '/product-list',
      name: 'product-list',
      component: ProductList,
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
