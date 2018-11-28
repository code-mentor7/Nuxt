
export const state = () => {
  return {
    landingPage: {},
    siteIdentity: {}
  }
}

export const mutations = {
  SET_LANDING_PAGE (state, value) {
    state.landingPage = value
  },
  SET_SITE_IDENTITY (state, value) {
    state.siteIdentity = value
  }
}
export const actions = {
  setLandingPage ({ commit }, value) {
    commit("SET_LANDING_PAGE", value)
  },
  setSiteIdentity ({ commit }, value) {
    commit("SET_SITE_IDENTITY", value)
  }

}
