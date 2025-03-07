import { createApp } from 'vue'

import App from './App.vue'
import posthogPlugin from './plugins/posthog'
import './style.css'

const app = createApp(App)

app.use(posthogPlugin)
app.mount('#app')
