/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// 引入抽奖插件
import VueLuckyCanvas from '@lucky-canvas/vue'

import LongPressPlugin from '@/plugins/longpress';

const app = createApp(App).use(VueLuckyCanvas).use(LongPressPlugin);

registerPlugins(app)

app.mount('#app')
