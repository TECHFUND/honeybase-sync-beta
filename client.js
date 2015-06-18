(function(){
  var sockjs_url = 'http:0.0.0.0:9999/chat';
  var sockjs = new SockJS(sockjs_url);
  var multiplexer = new WebSocketMultiplex(sockjs);

  var io1  = multiplexer.channel('io1');
  io1.onmessage = function(e) {
    console.log(JSON.parse(e.data));
  };

  var io2  = multiplexer.channel('io2');
  io2.onmessage = function(e) {
    console.log(JSON.parse(e.data));
  };

  var io3  = multiplexer.channel('io3');
  io3.onmessage = function(e) {
    console.log(JSON.parse(e.data));
  };

  document.getElementById("b1").addEventListener("click", function(e){
    io1.send(JSON.stringify({content:"hoge1"}));
  });
  document.getElementById("b2").addEventListener("click", function(e){
    io2.send(JSON.stringify({content:"hoge2"}));
  });
  document.getElementById("b3").addEventListener("click", function(e){
    io3.send(JSON.stringify({content:"hoge3"}));
  });
}());
