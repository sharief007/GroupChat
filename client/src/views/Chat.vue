<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <b-navbar type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="#">{{ groupTitle }}</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="More options" right>
            <b-dropdown-item href="#">
              <b-icon icon="arrow-bar-up"></b-icon>
              <span class="mx-1">Send Link</span>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <b-icon icon="box-arrow-right"></b-icon>
              <span class="mx-1">Exit Room</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <div class="flex-grow-1 overflow-auto">
      <div v-for="(item) in messages" :class="item.sent? 'message-sent':'message-received'" :key="item.id">
        <div v-if="item.sent" class="message-sent-content bg-primary"> {{item.text}}</div>
        <div v-if="item.sent">
          <small class="mx-1">{{item.sender}}</small>
          <small class="mx-1">{{item.time}}</small>
        </div>
        <div v-if="!item.sent" class="message-received-content bg-secondary text-light">{{item.text}}</div>
        <div v-if="!item.sent">
          <small class="mx-1">{{item.sender}}</small>
          <small class="mx-1">{{item.time}}</small>
        </div>
      </div>
    </div>
    <b-form class="pb-2 bg-light" @submit="sendMessage">
      <b-input-group class="px-2">
        <b-form-input type="text" v-model="message" required class="mx-1"></b-form-input>
        <b-button type="submit" variant="primary" class="mx-1">
          <b-icon icon="cursor-fill"></b-icon>
          <span>send</span>
        </b-button>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  methods: {
    sendMessage() {

    }
  },
  data() {
    return {
      groupTitle : 'ThunderBolt',
      message: null,
      messages: [
        {
          id: 12,
          text : 'hello MF!',
          sent : false,
          sender: 'Kakarot',
          time: new Date().toLocaleTimeString()
        },
        {
          id: 3,
          text : 'Fuck you ',
          sent : true,
          sender: 'Vegeta',
          time : new Date().toLocaleTimeString()
        }
      ]
    }
  }
}
</script>

<style scoped>
.chat-box {
  flex: 1;
  overflow-y: auto;
  min-height: calc(100vh - 8rem);
  max-height: calc(100vh - 8rem);
  padding: 0 10px;
}
.message-sent {
  padding: 5px;
  display: grid;
  grid-template-columns: 85%;
  justify-items: end;
  border-radius: 15px 0 15px 15px;
  justify-content: end;
}
.message-received {
  padding: 5px;
  display: grid;
  grid-template-columns: 85%;
  justify-items: start;
  border-radius: 0px 15px 15px 15px;
}
.message-sent-content {
  border-radius: 15px 15px 0px 15px;
  background-color: #0275d8;
  color: white;
  padding: 5px 10px;
}
.message-received-content {
  border-radius: 0px 15px 15px 15px;
   /*background-color: #F0F0F0;; */
  /*background-color: #383838;*/
  /*color: white;*/
  padding: 5px 10px;
}
</style>