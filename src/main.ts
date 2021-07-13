import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store, {key} from './store'
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
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  Card,
  Stepper,
  SubmitBar,
  Empty,
  AddressEdit,
  AddressList,
  ContactCard,
  Popup,
  Tab,
  Tabs,
  PullRefresh,
  List,
  Dialog,
  TreeSelect,
  Search,
} from 'vant'

app.config.globalProperties.$filter = {
  prefix(url: string) {
    url = String(url)
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  },
}


app.use(store, key)

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
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SwipeCell)
  .use(Card)
  .use(Stepper)
  .use(SubmitBar)
  .use(Empty)
  .use(AddressEdit)
  .use(AddressList)
  .use(ContactCard)
  .use(Popup)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(List)
  .use(Dialog)
  .use(TreeSelect)
  .use(Search)

app.use(router)
app.use(store)

app.mount('#app')
