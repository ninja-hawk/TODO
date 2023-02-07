export const state = () => ({
  drawer: false,
  share: false,
  title: "TODO"
})

export const mutations = {
  setDrawer: (state) => {
    state.drawer = !state.drawer
  },
  setShare: (state) => {
    state.share = !state.share
  },
  setTitle: (state, response) => {
    state.title = response
  }
}

export const getters = {
  drawer: (state) =>  {
    return state.drawer
  },
  share: (state) =>  {
    return state.share
  },
  title: (state) =>  {
    return state.title
  }

}

export const actions = {
  pushDrawer ({ commit }){
    commit('setDrawer')
  },
  pushShare ({ commit }){
    commit('setShare')
  },
  pushTitle ({commit}, argument){
    commit('setTitle', argument)
  }
}
