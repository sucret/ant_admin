const app = {
  state: {
    sideCollapsed: false,
    theme: 'light'
  },
  mutations: {
    CHANGE_THEME: (state) => {
      state.theme = state.theme == 'dark' ? 'light' : 'dark'
    },
    CHANGE_SIDE_COLLAPSED: (state) => {
      state.sideCollapsed = !state.sideCollapsed
    }
  }
}

export default app
