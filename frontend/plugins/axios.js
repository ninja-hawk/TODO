export default function ({ $axios, store, redirect }) {
  $axios.setHeader('Content-Type', 'application/json')
  $axios.setHeader('Accept', 'application/json')

  $axios.onRequest(config => {
    console.log('onRequest', config)
    store.commit('layout/loadingTrue')
  })

  $axios.onResponse(response => {
    console.log('onResponse', response)
    store.commit('layout/loadingFalse')
    store.commit('layout/setLastModified')
  })
  $axios.onError(error => {
    console.log('onError', error)
    store.commit('layout/loadingFalse')
    if (error.response.status === 401 || error.response.status === 404) {
      redirect('/')
    }
  })
}