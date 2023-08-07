import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useAppStore } from './app'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { pinia, useUserStore, useAppStore }
