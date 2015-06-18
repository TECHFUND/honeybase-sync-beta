var sockjs = require('sockjs'),
    http = require('http'),
    redis = require('redis').createClient(6379, 'localhost'),
    redisOther1 = require('redis').createClient(),
    redisOther2 = require('redis').createClient(),
    redisOther3 = require('redis').createClient(),
    websocket_multiplex = require('websocket-multiplex');

var service = sockjs.createServer();
var connections = [];
var multiplexer = new websocket_multiplex.MultiplexServer(service);


var io1 = multiplexer.registerChannel('io1');
io1.on('connection', function(conn) {
  connections.push(conn);
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
    redisOther1.publish('chat-message1', message);
  });
});

var io2 = multiplexer.registerChannel('io2');
io2.on('connection', function(conn) {
  connections.push(conn);
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
    redisOther2.publish('chat-message2', message);
  });
});

var io3 = multiplexer.registerChannel('io3');
io3.on('connection', function(conn) {
  connections.push(conn);
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
    redisOther3.publish('chat-message3', message);
  });
});


var httpServer = http.createServer();
service.installHandlers(httpServer, {prefix:'/chat'});
httpServer.listen(9999, '0.0.0.0'); // http://0.0.0.0:9999/chatがwebsocketハンドシェイクのエンドポイント
redis.subscribe('chat-message1');
redis.subscribe('chat-message2');
redis.subscribe('chat-message3');

// when data
redis.on('message', function(channel, rawMsgData) {
  for(var conn in connections) {
    connections[conn].write(rawMsgData);
  }
});
