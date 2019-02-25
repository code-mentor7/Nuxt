
export const state = () => {
  return {
    tour: {},
    tours: [],
    toursCount: 0
  }
}

export const mutations = {
  SET_TOUR (state, value) {
    state.tour = value
  },
  SET_TOURS (state, value) {
    state.tours = value
  },
  SET_TOURS_COUNT (state, value) {
    state.toursCount = value
  }
}
export const actions = {
  setTour ({ commit }, value) {
    commit("SET_TOUR", value)
  },
  setTours ({ commit }, value) {
    commit("SET_TOURS", value)
  },
  setToursCount ({ commit }, value) {
    commit("SET_TOURS_COUNT", value)
  }

}
