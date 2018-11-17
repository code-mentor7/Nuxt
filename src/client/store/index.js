
export const state = () => {
  return {
    inactive: false,
    isDarkTheme: true,
    isFullPageLoading: false,
    isSnackbar: false,
    localeLang: { value: "en", name: "English", code: "us" },
    showSideBar: false,
    snackBarText: "",
    snackBarType: "info"
  }
}

export const mutations = {
  SET_FULL_PAGE_LOADING (state, value) {
    state.isFullPageLoading = value
  },
  SET_INACTIVE (state, value) {
    state.inactive = value
  },
  SET_IS_DARK_THEME (state, value) {
    state.isDarkTheme = value
  },
  SET_LOCALE_LANG (state, value) {
    state.localeLang = value
  },
  SET_SNACKBAR (state, value) {
    state.isSnackbar = value
  },
  SET_SNACKBAR_TEXT (state, value) {
    state.snackBarText = value
  },
  SET_SNACKBAR_TYPE (state, value) {
    state.snackBarType = value
  },
  SHOW_SIDE_BAR (state, value) {
    state.showSideBar = value
  }

}
export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    // const ip = await app.$axios.$get('http://icanhazip.com')
    // commit('SET_IP', ip)
  },
  showSideBar ({ commit }, value) {
    commit("SHOW_SIDE_BAR", value)
  },
  setInactive ({ commit }, value) {
    commit("SET_INACTIVE", value)
  },
  setFullPageLoading ({ commit }, value) {
    commit("SET_FULL_PAGE_LOADING", value)
  },
  setLocaleLang ({ commit }, value) {
    commit("SET_LOCALE_LANG", value)
  },
  setSnackbar ({ commit }, value) {
    commit("SET_SNACKBAR", value)
  },
  setIsDarkTheme ({ commit }, value) {
    commit("SET_IS_DARK_THEME", value)
  },
  setupSnackbar ({ commit }, { show, text, type }) {
    commit("SET_SNACKBAR_TEXT", text)
    commit("SET_SNACKBAR_TYPE", type)
    commit("SET_SNACKBAR", show)
  }

}
