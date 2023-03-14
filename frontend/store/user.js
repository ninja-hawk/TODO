const API_URL = `${process.env.API_BASE_URL}/api`

export const state = () => {
  return {
    user: {}
  }
}

export const getters = {
  user: (state) =>  {
    return state.user
  },
}

export const mutations = {
  setUser (state, response) {
    state.user = response
  },
  deleteTodo (state, response){
    state.user.todos = state.user.todos.filter(element => element.id !== response)
  }
}

export const actions = {
  async getUser ({ commit }, argument) {
    const response = await this.$axios.get(`${API_URL}/users/${argument}`)
    commit('setUser', response.data)
  },
  async deleteTodo({commit}, argument){
    commit('deleteTodo',argument)
    const response = await this.$axios.delete(`${API_URL}/todos/${argument}`)
    return response.data
  }
}
