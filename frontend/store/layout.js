export const state = () => ({
  drawer: false,
  isLoading: false,
  lastModified: new Date()
})

export const mutations = {
  setDrawer: (state) => {
    state.drawer = !state.drawer
  },
  loadingTrue: state => {
    state.isLoading = true
  },
  loadingFalse: state => {
    state.isLoading = false
  },
  setLastModified: (state, response) => {
    state.lastModified = new Date(response.updated_at)
  }
}

export const getters = {
  drawer: (state) =>  {
    return state.drawer
  },
  isLoading: state => {
    return state.isLoading
  },
  lastModified: state => {
    return state.lastModified
  }
}

export const actions = {
  pushDrawer ({ commit }){
    commit('setDrawer')
  },
  pushLastModified({commit}, argument){
    commit('setLastModified', argument)
  }
}
