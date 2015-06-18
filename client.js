(function(global){
  var interval = 2000;
  var initSocket = function(){
    var sockJS = new SockJS('http://0.0.0.0:9999/chat');
    sockJS.onopen    = function()  {
      console.log('opened');
    };
    sockJS.onclose   = function()  {
      console.log('closed');
      interval+=100;
      setTimeout(initSocket, interval);
    };
    return sockJS;
  };
  global.initSocket = initSocket;
}(window));

(function(){
  var sockJS = initSocket();

  sockJS.onmessage = function(e) {
    console.log(JSON.parse(e.data));
  };

  document.getElementsByTagName("button")[0].addEventListener("click", function(e){
    sockJS.send(JSON.stringify({content:"hoge"}));
  });
}());
