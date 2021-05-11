import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

console.log(App);

app.config.globalProperties.$filter = {
  prefix(url) {
    if (url && url.startWith('http')) {
      return url
    } else {
      url = 'http://backend-api-01.newbee.ltd${url}'
      return url
    }
  }
}

app.use(router)
app.use(store)

app.mount('#app')
