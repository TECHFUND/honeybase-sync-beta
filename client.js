(function(global){
  function PubSub(){
    var sockjs_url = 'http://0.0.0.0:8001/pubsub';
    var sockjs = new SockJS(sockjs_url);
    var multiplexer = new WebSocketMultiplex(sockjs);
    this.socket = multiplexer.channel('honeybase');
    this.channels = [];
  }

  PubSub.prototype.publish = function(channel, value){
    this.socket.send(JSON.stringify({channel:channel, value: value}));
  }

  PubSub.prototype.subscribe = function(channel, cb){
    var self = this;
    self.channels.push(channel);

    self.socket.onmessage = function(e) {
      var data = JSON.parse(e.data);
      var channel = data.channel;
      var value = data.value;

      if(self.channels.indexOf(channel) != -1) cb(value);
      else {}
    };
  }

  global.PubSub = PubSub;
  return global;
}(window));

(function(){
  var pubsub = new PubSub();

  document.getElementById("b1").addEventListener("click", function(e){
    pubsub.publish("hoge", {hoge: "fuga"});
  });

  pubsub.subscribe("hoge", function(data){
    console.log(data);
  });
}());
