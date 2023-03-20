import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from "./router/index.js"
import { store } from '../store/sendNotify.js'



const vuetify = createVuetify({
    components,
    directives,
})




createApp(App).use(store).use(vuetify).use(router).use(Toast, {
    position: 'top-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
}).mount('#app')
