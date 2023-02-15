const API_URL = `${process.env.API_BASE_URL}/api`

export const state = () => ({
  todo: {
  id: 0,
  title: "",
  share: false,
  password: null,
  user_id: 1,
  subjects: []
}})

export const mutations = {
  setTitleNull: (state) => {
    state.todo.title = null
  },
  setTodo: (state, response) => {
    state.todo = response
  },
  setTitle: (state, response) => {
    state.todo.title = response
  },
  setShare: (state) => {
    state.todo.share = !state.todo.share
  },
  setPassword: (state,response) => {
    state.todo.password = response
  },
  setTask: (state, response) => {
    state.todo.subjects.find(element => element.id === response.subjectid).tasks.push({
      subject_id: response.subjectid,
      id: 11,
      done: false,
      text: response.newTask,
      due: null,
      mtg: false,
      priority: false
    })
  },
  setNewTask: (state, response) =>{
    const task = state.todo.subjects.find(element => element.id === response.subjectid).tasks.find(element => element.id === response.taskId)
    task.text = response.text
  },
  setDone: (state, response) => {
    const task = state.todo.subjects.find(element => element.id === response.subjectid).tasks.find(element => element.id === response.taskId)
    task.done = !task.done
  },
  setPriority: (state, response) => {
    const task = state.todo.subjects.find(element => element.id === response.subjectid).tasks.find(element => element.id === response.taskId)
    task.priority = !task.priority
  },
  setMtg: (state, response) => {
    const task = state.todo.subjects.find(element => element.id === response.subjectid).tasks.find(element => element.id === response.taskId)
    task.mtg = !task.mtg
  },
  setDue: (state, response) => {
    const task = state.todo.subjects.find(element => element.id === response.subjectid).tasks.find(element => element.id === response.taskId)
    task.due = response.due
  }
}

export const getters = {
  title: (state) =>  {
    return state.todo.title
  },
  share: (state) =>  {
    return state.todo.share
  },
  password: (state) => {
    return state.todo.password
  },
  subjects: (state) => {
    return state.todo.subjects
  }
}

export const actions = {
  async getTodo ({commit}, argument){
    // レイアウトのため一度titleをゼロに
    commit('setTitleNull')
    const response = await this.$axios.get(`${API_URL}/todos/${argument}`)
    commit('setTodo', response.data.data)
  },
  pushShare ({ state, commit }, argument){
    commit('setShare')
    this.$axios.put(`${API_URL}/todos/${argument}`, {title: state.todo.title, share: state.todo.share, password: state.todo.password})
  },
  pushTitle ({state, commit}, argument){
    commit('setTitle', argument.title)
    this.$axios.put(`${API_URL}/todos/${argument.id}`, {title: state.todo.title, share: state.todo.share, password: state.todo.password})
  },
  pushPassword ({state, commit}, argument){
    commit('setPassword', argument)
    this.$axios.put(`${API_URL}/todos/${argument}`, {title: state.todo.title, share: state.todo.share, password: state.todo.password})
  },
  pushTask ({commit}, argument){
    commit('setTask', argument)
  },
  changeTask ({commit}, argument){
    commit('setNewTask', argument)
  },
  pushDone ({commit}, argument){
    commit('setDone', argument)
  },
  pushPriority ({commit}, argument){
    commit('setPriority', argument)
  },
  pushMtg ({commit}, argument){
    commit('setMtg', argument)
  },
  pushDue ({commit}, argument){
    commit('setDue',argument)
  }
}
