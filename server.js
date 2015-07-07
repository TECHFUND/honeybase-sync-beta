var sockjs = require('sockjs'),
    http = require('http'),
    redis = require('redis').createClient(6379, 'localhost'),
    redisOther1 = require('redis').createClient(),
    websocket_multiplex = require('websocket-multiplex');

var service = sockjs.createServer();
var connections = [];
var multiplexer = new websocket_multiplex.MultiplexServer(service);

var socket = multiplexer.registerChannel('honeybase');
socket.on('connection', function(conn) {
  connections.push(conn);
  redis.subscribe('chat-message1');

  conn.on('close', function() {
    for(var i in connections) {
      if(connections[i] == conn) {
        connections.splice(i,1);
        console.log('disconnected!');
        break;
      }
    }
  });
  conn.on('data', function(message) {
    console.log(message);
    redisOther1.publish('chat-message1', message);
  });
});


var httpServer = http.createServer();
service.installHandlers(httpServer, {prefix:'/pubsub'});
httpServer.listen(8002, '0.0.0.0'); // http://0.0.0.0:9999/chatがwebsocketハンドシェイクのエンドポイント

// when data
redis.on('message', function(channel, rawMsgData) {
  for(var conn in connections) {
    connections[conn].write(rawMsgData);
  }
});
