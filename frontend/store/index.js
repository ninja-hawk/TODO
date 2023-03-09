const inBrowser = typeof window !== 'undefined'

export const state = () => {
  return {
    user: null,
    loggedIn: false,
    token: null
  }
}

export const getters = {}

export const mutations = {
  setUser (state, { user }) {
    state.user = user
    state.loggedIn = Boolean(user)
  },

  setToken (state, { token }) {
    state.token = token

    // Store token in cookies
    if (inBrowser) {
      if (token) {
        this.$cookies.set('token', token, { expires: new Date(Date.now() + (30*24*3600000)) })
      } else {
        this.$cookies.remove('token')
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

  logout ({ commit }) {
    commit('setUser', { user: null })

    // Revoke access token
    return this.$axios.delete('/oauth/token/destroy').then(() => {
      commit('setToken', { token: null })
    }).catch(e => {
      commit('setToken', { token: null })
    })
  }
}
