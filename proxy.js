var httpProxy = require('http-proxy');

httpProxy.createServer({
  target: 'ws://0.0.0.0:8001',
  ws: true
}).listen(8001);
