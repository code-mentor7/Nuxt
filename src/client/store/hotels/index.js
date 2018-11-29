
export const state = () => {
  return {
    hotels: [],
    hotelsCount: 0
  }
}

export const mutations = {
  SET_HOTELS (state, value) {
    state.hotels = value
  },
  SET_HOTELS_COUNT (state, value) {
    state.hotelsCount = value
  }
}
export const actions = {
  setHotels ({ commit }, value) {
    commit("SET_HOTELS", value)
  },
  setHotelsCount ({ commit }, value) {
    commit("SET_HOTELS_COUNT", value)
  }

}
