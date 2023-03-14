const API_URL = `${process.env.API_BASE_URL}/api`

export const state = () => ({
  totalTasks: [],
  todo: {
  id: 0,
  title: "",
  share: true,
  password: null,
  user_id: 1,
  subjects: []
}})

export const mutations = {
  reset: (state) =>{
    state.totalTasks = []
    state.todo = {
      id: 0,
      title: "",
      share: false,
      password: null,
      user_id: 1,
      subjects: []
    }
  },
  setTitleNull: (state) => {
    state.todo.title = ""
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
  setSubject: (state, response) => {
    state.todo.subjects.push(response)
  },
  setDeleteSubject: (state, response) => {
    state.todo.subjects = state.todo.subjects.filter(element => element.id !== response)
  },
  setName: (state, response) => {
    const subject = state.todo.subjects.find(element => element.id === response.id)
    subject.name = response.name
  },
  setTotalTasks: (state) => {
    state.totalTasks = []
    state.todo.subjects.forEach(element => {
      state.totalTasks = state.totalTasks.concat(element.tasks)
    });
    state.totalTasks.sort(function(x,y) {
      if (x.due === null) {
        return 1;
      }

      if (y.due === null) {
        return -1;
      }

      if (x.due === y.due) {
        return 0;
      }

      return x.due < y.due ? -1 : 1;
    })
  },
  sortTasks: (state) => {
    for (let i=0; i < state.todo.subjects.length; i++){
      state.todo.subjects[i].tasks.sort(function(x,y) {
        if (x.due === null) {
          return 1;
        }

        if (y.due === null) {
          return -1;
        }

        if (x.due === y.due) {
          return 0;
        }

        return x.due < y.due ? -1 : 1;
      })
    }
  },
  setTask: (state, response) => {
    state.todo.subjects.find(element => element.id === response.subjectid).tasks.push({
      subject_id: response.subjectid,
      id: response.id,
      done: false,
      time: null,
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
  setDeleteTask: (state, response) => {
    state.todo.subjects.find(element => element.id === response.subjectid).tasks = state.todo.subjects.find(element => element.id === response.subjectid).tasks.filter(element => element.id !== response.taskId)
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
  },
  totalTasks: (state) => {
    return state.totalTasks
  }
}

export const actions = {
  async newOpen({commit}){
    commit('reset')
    const response = await this.$axios.get(`${API_URL}/todos/create`)
    return response.data
  },
  async getTodo ({commit}, argument){
    // レイアウトのため一度titleをゼロに
    commit('setTitleNull')
    commit('reset')
    const response = await this.$axios.get(`${API_URL}/todos/${argument}`)
    await commit('setTodo', response.data)
    commit('sortTasks')
    commit('setTotalTasks')
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
    commit('setShare')
    commit('setPassword', argument)
    this.$axios.put(`${API_URL}/todos/${argument.id}`, {title: state.todo.title, share: state.todo.share, password: argument.password})
  },
  async pushSubject({commit}, argument){
    const response = await this.$axios.post(`${API_URL}/subjects/`, {todo_id: argument})
    commit('setSubject', response.data)
  },
  deleteSubject({commit}, argument){
    commit('setDeleteSubject', argument)
    commit('setTotalTasks')
    this.$axios.delete(`${API_URL}/subjects/${argument}`)
  },
  pushName ({commit}, argument){
    commit('setName', argument)
    this.$axios.put(`${API_URL}/subjects/${argument.id}`, {name: argument.name})
  },
  async pushTask ({commit}, argument){
    const response = await this.$axios.post(`${API_URL}/tasks/`, {
      subject_id: argument.subjectid,
      done: false,
      time: null,
      text: argument.newTask,
      due: null,
      mtg: false,
      priority: false
    });
    argument.id = response.data.id
    commit('setTask', argument)
    commit('setTotalTasks')
  },
  changeTask ({commit}, argument){
    commit('setNewTask', argument)
    this.$axios.put(`${API_URL}/task/text/${argument.taskId}`, {
      text: argument.text,
    })
  },
  deleteTask ({commit}, argument){
    commit('setDeleteTask', argument)
    commit('setTotalTasks')
    this.$axios.delete(`${API_URL}/tasks/${argument.taskId}`)
  },
  pushDone ({commit}, argument){
    commit('setDone', argument)
    this.$axios.put(`${API_URL}/task/done/${argument.taskId}`)
  },
  pushPriority ({commit}, argument){
    commit('setPriority', argument)
    this.$axios.put(`${API_URL}/task/priority/${argument.taskId}`)
  },
  pushMtg ({commit}, argument){
    commit('setMtg', argument)
    this.$axios.put(`${API_URL}/task/mtg/${argument.taskId}`)
  },
  async pushDue ({commit}, argument){
    commit('setDue',argument)
    await this.$axios.put(`${API_URL}/task/due/${argument.taskId}`, {
      due: argument.due,
    })
    commit('sortTasks')
    commit('setTotalTasks')
  },
}
