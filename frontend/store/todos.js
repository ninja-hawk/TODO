export const state = () => ({
  id: 1,
  title: "DEMO1",
  share: false,
  password: null,
  subjects: [
    {
      id: 1,
      name: "TODO1",
      task:
        [
          {
            subject_id: 1,
            id: 1,
            done: false,
            text: "残余ネットワーク",
            due: "2023-02-08",
            mtg: true,
            priority: true
          },
          {
            subject_id: 1,
            id: 2,
            done: false,
            text: "整数計画の定式化",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },
          {
            subject_id: 1,
            id: 3,
            done: false,
            text: "弱双対定理を使いこなせるか",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },

        ]
    },
    {
      id: 2,
      name: "TODO2",
      task:
        [
          {
            subject_id: 2,
            id: 14,
            done: false,
            text: "シンプレックスタブロー",
            due: false,
            mtg: false,
            priority: false
          },
          {
            subject_id: 2,
            id: 15,
            done: false,
            text: "双対問題",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },
          {
            subject_id: 2,
            id: 16,
            done: false,
            text: "勾配ベクトル・ヘッセ行列",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },
        ]
    },
    {
      id: 3,
      name: "TODO3",
      task:
        [
          {
            subject_id: 3,
            id: 27,
            done: false,
            text: "正定値行列",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },
          {
            subject_id: 3,
            id: 28,
            done: false,
            text: "ニュートン法",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },
        ]
    },
    {
      id: 4,
      name: "TODO4",
      task:
        [
          {
            subject_id: 4,
            id: 39,
            done: false,
            text: "集合被覆問題",
            due: "2023-02-08",
            mtg: false,
            priority: false
          },
          {
            subject_id: 4,
            id: 40,
            done: false,
            text: "ナップザック問題",
            due: "2023-02-08",
            mtg: false,
            priority: false
          }
        ]
    }
  ]
})

export const mutations = {
  setTitle: (state, response) => {
    state.title = response
  },
  setShare: (state) => {
    state.share = !state.share
  },
  setPassword: (state,response) => {
    state.password = response
  },
  setTask: (state, response) => {
    state.subjects.find(element => element.id === response.subjectid).task.push({
      subject_id: response.subjectid,
      id: 11,
      done: false,
      text: response.newTask,
      due: new Date(),
      mtg: false,
      priority: false
    })
  },
  setNewTask: (state, response) =>{
    const task = state.subjects.find(element => element.id === response.subjectid).task.find(element => element.id === response.taskId)
    task.text = response.text
  },
  setDone: (state, response) => {
    const task = state.subjects.find(element => element.id === response.subjectid).task.find(element => element.id === response.taskId)
    task.done = !task.done
  },
  setPriority: (state, response) => {
    const task = state.subjects.find(element => element.id === response.subjectid).task.find(element => element.id === response.taskId)
    task.priority = !task.priority
  },
  setMtg: (state, response) => {
    const task = state.subjects.find(element => element.id === response.subjectid).task.find(element => element.id === response.taskId)
    task.mtg = !task.mtg
  },
  setDue: (state, response) => {
    const task = state.subjects.find(element => element.id === response.subjectid).task.find(element => element.id === response.taskId)
    task.due = response.due
  }
}

export const getters = {
  title: (state) =>  {
    return state.title
  },
  share: (state) =>  {
    return state.share
  },
  password: (state) => {
    return state.password
  },
  subjects: (state) => {
    return state.subjects
  }
}

export const actions = {
  pushShare ({ commit }){
    commit('setShare')
  },
  pushTitle ({commit}, argument){
    commit('setTitle', argument)
  },
  pushPassword ({commit}, argument){
    commit('setPassword', argument)
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
