import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sideCollapsed: false,
      theme: 'light',
      topSelectedKey: [],
      leftSelectedKey: []
    }
  },
  actions: {
    changeTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'
    },
    changeCollapsed() {
      this.sideCollapsed = !this.sideCollapsed
    }
  }
})
