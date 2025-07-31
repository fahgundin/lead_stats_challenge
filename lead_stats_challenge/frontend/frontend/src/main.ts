import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import './style.css'
import App from './App.vue'

const queryClient = new QueryClient()

const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })
app.mount('#app')


// createApp(App).mount('#app')
// App.use(VueQueryPlugin, { queryClient })