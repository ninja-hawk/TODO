export default function ({ $axios, store, redirect }) {
  // $axios.setHeader('Content-Type', 'application/json')
  // $axios.setHeader('Accept', 'application/json')

  $axios.onRequest(config => {
    console.log('onRequest', config)
    // store.commit('api/loadingTrue')
  })

  $axios.onResponse(response => {
    console.log('onResponse', response)
    // store.commit('api/loadingFalse')
  })
  $axios.onError(error => {
    console.log('onError', error)
    // store.commit('api/loadingFalse')
    // if (error.response.status === 401) {
    //   redirect('/login')
    // }
  })
}
