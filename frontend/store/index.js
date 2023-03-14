const API_URL = `${process.env.API_BASE_URL}/api`
const inBrowser = typeof window !== 'undefined'

export const state = () => {
  return {
    user: null,
    loggedIn: false,
    token: null
  }
}

export const getters = {
  user: (state) =>  {
    return state.user
  },
  loggedIn: (state) =>  {
    return this.$cookies.get('todoLoggedIn')
    // return state.loggedIn
  },
  token: (state) =>  {
    return this.$cookies.get('todoToken')
    // return state.token
  },
}

export const mutations = {
  setUser (state, { user }) {
    state.user = user
    state.loggedIn = Boolean(user)
    if (inBrowser) {
      if (user) {
        this.$cookies.set('todoUser', user)
        this.$cookies.set('todoUserId', user.id)
      } else {
        // Logout
        this.$cookies.remove('todoUser')
      }
    }
  },

  setToken (state, { token }) {
    state.token = token

    // Store token in cookies
    if (inBrowser) {
      if (token) {
        this.$cookies.set('todoToken', token)
      } else {
        // Logout
        this.$cookies.remove('todoToken')
      }
    }
  }
}

export const actions = {
  // ユーザーの訪問時（SSR）で呼ばれるメソッド
  nuxtServerInit ({ dispatch, state, commit }, { error }) {
    const token = this.$cookies.cookies.token

    if (!token) {
      return Promise.resolve()
    }

    return dispatch('fetchUserByAccessToken', { token }).catch(e => {
      return dispatch('logout').catch(e => {
        error({ message: e.message, statusCode: e.statusCode })
      })
    })
  },

  fetchUserByAccessToken ({ commit, dispatch }, { token }) {
    commit('setToken', { token })

    return this.$axios.$get('/users/@me').then(user => {
      commit('setUser', { user })
    })
  },

  async logout ({ commit }, argument) {
    commit('setUser', { user: null })
    await this.$cookies.set('todoLoggedIn', false)
    this.$cookies.remove('todoUserId')
    // Revoke access token
    return this.$axios.delete(`${API_URL}/logout/${argument}`).then(() => {
      commit('setToken', { token: null })
    }).catch(e => {
      commit('setToken', { token: null })
    })
  }
}
