import { createStore } from 'vuex'

export default createStore({
  state: {
    playlist:[{
      id: 1928721936,
      name: "不够深情",
      author: "东子陌",
      picUrl: "https://p3.music.126.net/8_7JXeTVKmnwEHlsF9QKJQ==/109951167156612605.jpg?param=34y34"
    }],
    playCurrentIndex: 0,
    Playing: false
  },
  getters: {
  },
  mutations: {
    setPlaylist:function(state,value){
      state.playlist = value
    },
    // 该方法需要value是歌曲的al信息
    addPlaylist:function(state,value){
      state.playlist.push(value)
      
      state.playCurrentIndex = state.playCurrentIndex + 1

      console.log(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
