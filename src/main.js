import { createApp } from 'vue'

import App from './App.vue'
import { PostHogPlugin } from './plugins/posthog'
import './style.css'

const app = createApp(App)
app.use(PostHogPlugin)
app.mount('#app')
