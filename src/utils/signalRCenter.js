// 基于SignalR 进行实时通讯

const signalR = require('@microsoft/signalr')
// 创建连接
const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5959/SignalRHub', {})
  .configureLogging(signalR.LogLevel.Error) // 日志等级
  .build()
// 客户端注册事件
// 注册事件回调参数个数应与后端一致
connection.on('RecieveMessage', (user, message) => {
  console.log(user, message)
})
// 建议将参数合并到一个对象中
connection.on('RecieveMessage', data => {
  let [user, message] = data
  console.log(user, message)
})

// 生命周期
connection.onreconnecting(error => {
  console.log(error)
})
connection.onreconnected(connectionId => {
  console.log(connectionId)
})
connection.onclose(error => {
  console.log(error)
})

// 自定义开始函数
async function start () {
  try {
    await connection.start()
    console.log('SignalR Connected.')
  } catch (err) {
    console.log(err)
    setTimeout(this.start(), 5000)
  }
}

// 启动
start()
// 在启动完成立即发送请求
start()
  .then(() => connection.invoke('MethodName', { name: 1 }))
  .catch(error => console.log(error))
