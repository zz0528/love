import { createApp } from 'vue'

import '@/assets/styles/index.scss'
import 'amfe-flexible/index.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import Vconsole from 'vconsole'
import App from './App.vue'
import router from './router'
import store from './store'
const vConsole = new Vconsole()
const app = createApp(App)

app.use(Vant).use(store).use(router).use(vConsole).mount('#app')
