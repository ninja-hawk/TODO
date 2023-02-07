export const state = () => ({
  drawer: false
})

export const mutations = {
  setDrawer: (state) => {
    state.drawer = !state.drawer
  }
}

export const getters = {
  drawer: (state) =>  {
    return state.drawer
  }
}

export const actions = {
  pushDrawer ({ commit }){
    commit('setDrawer')
  }
}
