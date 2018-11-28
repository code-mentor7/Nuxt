
export const state = () => {
  return {
    tours: [],
    toursCount: 0
  }
}

export const mutations = {
  SET_TOURS (state, value) {
    state.tours = value
  },
  SET_TOURS_COUNT (state, value) {
    state.toursCount = value
  }
}
export const actions = {
  setTours ({ commit }, value) {
    commit("SET_TOURS", value)
  },
  setToursCount ({ commit }, value) {
    commit("SET_TOURS_COUNT", value)
  }

}
