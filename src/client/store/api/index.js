
export const state = () => {
  return {
    landingPage: {},
    siteIdentity: {},
    tours: []
  }
}

export const mutations = {
  SET_LANDING_PAGE (state, value) {
    state.landingPage = value
  },
  SET_SITE_IDENTITY (state, value) {
    state.siteIdentity = value
  },
  SET_TOURS (state, value) {
    state.tours = value
  }
}
export const actions = {
  setLandingPage ({ commit }, value) {
    commit("SET_LANDING_PAGE", value)
  },
  setSiteIdentity ({ commit }, value) {
    commit("SET_SITE_IDENTITY", value)
  },
  setTours ({ commit }, value) {
    commit("SET_TOURS", value)
  }

}
