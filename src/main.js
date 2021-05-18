import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'

const app = createApp(App)

import {
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Toast,
  Skeleton,
  Sticky,
  Tabbar,
  TabbarItem,
  NavBar,
  NumberKeyboard,
  Form,
  Field,
  Cell,
  CellGroup,
} from 'vant'

app.config.globalProperties.$filter = {
  prefix(url) {
    url = String(url)
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  },
}

app
  .use(Button)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Skeleton)
  .use(Sticky)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(NumberKeyboard)
  .use(Form)
  .use(Field)
  .use(Cell)
  .use(CellGroup)

app.use(router)
app.use(store)

app.mount('#app')
