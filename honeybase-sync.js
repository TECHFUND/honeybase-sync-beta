var forever = require('forever');

var proxy = forever.start(['node', 'proxy.js'], {
  max : 10000,
  silent : true
});

var server = forever.start(['node', 'server.js'], {
  max : 10000,
  silent : true
});
