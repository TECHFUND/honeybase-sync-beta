var sockjs = require('sockjs'),
    http = require('http'),
    redis = require('redis').createClient(6379, 'localhost'),
    redisOther = require('redis').createClient();

var sockServer = sockjs.createServer();
var connections = [];

sockServer.on('connection', function(conn) {
  connections.push(conn);

  conn.on('data', function(message) {
    redisOther.publish('chat-message', message);
  });

  conn.on('close', function() {
    for(var i in connections) {
      if(connections[i] == conn) {
        connections.splice(i,1);
        console.log('disconnected!');
        break;
      }
    }
  });

});

var httpServer = http.createServer();
sockServer.installHandlers(httpServer, {prefix:'/chat'});
httpServer.listen(9999, '0.0.0.0'); // http://0.0.0.0:9999/chatがwebsocketハンドシェイクのエンドポイント
redis.subscribe('chat-message');

// when data
redis.on('message', function(channel, rawMsgData) {
  for(var conn in connections) {
    connections[conn].write(rawMsgData);
  }
});
