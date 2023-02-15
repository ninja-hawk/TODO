export const state = () => ({
  drawer: false,
  isLoading: false,
  lastModified: null
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
  setLastModified: state => {
    state.lastModified = new Date()
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
}
