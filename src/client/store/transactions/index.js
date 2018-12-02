
export const state = () => {
  return {
    transactions: [],
    transactionsCount: 0
  }
}

export const mutations = {
  SET_TRANSACTIONS (state, value) {
    state.transactions = value
  },
  SET_TRANSACTIONS_COUNT (state, value) {
    state.transactionsCount = value
  }
}
export const actions = {
  setTransactions ({ commit }, value) {
    commit("SET_TRANSACTIONS", value)
  },
  setTransactionsCount ({ commit }, value) {
    commit("SET_TRANSACTIONS_COUNT", value)
  }

}
