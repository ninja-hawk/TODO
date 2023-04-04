export const state = () => ({
  drawer: false,
  isLoading: false,
  lastModified: new Date(),
  passwordDialog: false,
  sortDialog: false
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
  },
  setPasswordDialogTrue: state => {
    state.passwordDialog = true
  },
  setPasswordDialogFalse: state => {
    state.passwordDialog = false
  },
  setSortDialogTrue: state => {
    state.sortDialog = true
  },
  setSortDialogFalse: state => {
    state.sortDialog = false
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
  },
  passwordDialog: state => {
    return state.passwordDialog
  },
  sortDialog: state => {
    return state.sortDialog
  }
}

export const actions = {
  pushDrawer ({ commit }){
    commit('setDrawer')
  },
  pushLastModified({commit}, argument){
    commit('setLastModified', argument)
  },
  pushPasswordDialogTrue({commit}){
    commit('setPasswordDialogTrue')
  },
  pushPasswordDialogFalse({commit}){
    commit('setPasswordDialogFalse')
  },
  pushSortDialogTrue({commit}){
    commit('setSortDialogTrue')
  },
  pushSortDialogFalse({commit}){
    commit('setSortDialogFalse')
  }
}
