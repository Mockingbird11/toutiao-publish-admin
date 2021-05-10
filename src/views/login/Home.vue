<template>
  <div>
    <input v-model="user" type="text" />
    <input v-model="message" type="text" /><br />
    <button @click="sendMsg">发送</button>
    <hr />
    <ul>
      <li v-for="(item, index) in msgList" :key="index">
        {{ item.user }}:&nbsp;&nbsp;&nbsp;&nbsp;{{ item.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
const signalR = require('@microsoft/signalr')
export default {
  data () {
    return {
      connection: '',
      user: '',
      message: '',
      msgList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5959/SignalRHub', {})
        .configureLogging(signalR.LogLevel.Error)
        .build()
      this.connection.on('ReceiveMessage', data => {
        this.msgList.push(data)
      })
      this.connection.start()
    },
    sendMsg () {
      let params = {
        user: this.user,
        message: this.message
      }
      this.connection.invoke('SendMessage', params)
    }
  }
}
</script>

<style></style>
