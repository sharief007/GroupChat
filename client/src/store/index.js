import Vue from 'vue'
import Vuex from 'vuex'
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stompClient: null,
    chatList: [],
    messageItems: []
  },
  mutations: {
    SET_STOMP_CLIENT(state,client) {
      state.stompClient = client
    },
    ADD_NEW_CHATLIST(state, message) {
      state.chatList.push(message);
    }
  },
  actions: {
    createStompClient({commit}) {
      let sockjs = new SockJS('http://localhost:1111/chat/')
      let client = Stomp.over(sockjs);
      // client.debug = ()=> {}
      console.log("Trying to connect to the server")
      // client.connect({login:'guest',password:'guest'},frame=>{
      client.connect({}, frame => {
        console.log(frame)
        console.log("I fucking connected !!")
        client.subscribe("/topic/123",(f)=>{
          console.log(f.body);
        });
        setInterval(()=>client.send("/app/room",JSON.stringify(new Date().toISOString)),1000)
      }, err=>console.log(JSON.stringify(err)))
      commit('SET_STOMP_CLIENT',client)
    },
    sendMessage({state}, message) {
      if(state.stompClient !== null) {
        state.stompClient.send('/app/room', JSON.stringify(message))
      } else {
        this.dispatch('createStompClient')
      }
    }
  },
  modules: {
  }
})
